// noinspection JSUnresolvedReference

import {defineStore, storeToRefs} from 'pinia'
import {db, storage} from '@/plugins/firebase.config'
import {
  doc,
  collection,
  deleteDoc,
  setDoc,
  query,
  orderBy,
  limit,
  getDocs,
  getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot,
} from 'firebase/firestore'
import {uploadBytes, ref as sref, getDownloadURL, deleteObject} from 'firebase/storage'
import {ref} from 'vue'
import {useAppState} from '@/store/app.store'
import {useAuthStore} from '@/store/auth.store'
import {useSnackbarMessages} from '@/store/snackbarmessages.store'

export const useContentStore = defineStore('contentStore', () => {
  const news = ref([])
  const newsIds = ref([])
  const stories = ref([])
  const storiesIds = ref([])
  const newsItem = ref()
  const sunday = ref({docId: '0'})
  const appState = useAppState()
  const {startLoading, finishLoading} = appState
  const {uid} = storeToRefs(useAuthStore())
  const {setMessage} = useSnackbarMessages()

  const sundayListener = ref(null)
  const newsListener = ref(null)
  const storiesListener = ref(null)

  function safeUnsubscribe(listenerRef) {
    if (listenerRef.value) {
      listenerRef.value()
      listenerRef.value = null
    }
  }

  function snapshotPromise(source, onSnapshotData) {
    return new Promise((resolve, reject) => {
      let settled = false
      const unsubscribe = onSnapshot(source, (snapshot) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        onSnapshotData(snapshot)
        resolve(unsubscribe)
      }, (error) => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        reject(error)
      })

      const timeout = setTimeout(() => {
        if (settled) return
        settled = true
        resolve(unsubscribe)
      }, 10000)
    })
  }

  async function getSunday(force = false) {
    if (sundayListener.value && !force) return
    if (force) safeUnsubscribe(sundayListener)
    startLoading()
    try {
      const q = query(collection(db, 'sunday'), orderBy('timeId', 'desc'), limit(1))
      sundayListener.value = await snapshotPromise(q, (qSnapshot) => {
        qSnapshot.forEach(doc => {
          const docId = doc.id
          sunday.value = {...doc.data(), docId}
        })
      })
    } catch (e) {
      setMessage(e.message)
      throw e
    } finally {
      finishLoading()
    }
  }

  async function saveSundayNotes(note) {
    const docRef = doc(db, 'users', uid.value)
    const res = await getDoc(docRef)
    const data = res.data()
    const noteInDB = data.sundayNotes.find(item => item.timeId === note.timeId)
    if (!!noteInDB) {
      await updateDoc(docRef, {
        sundayNotes: arrayRemove({
          text: noteInDB.text,
          title: noteInDB.title,
          id: noteInDB.id,
          timeId: noteInDB.timeId,
        }),
      }).then(() => {
        updateDoc(docRef, {
          sundayNotes: arrayUnion({
            text: note.text,
            title: note.title,
            id: note.id,
            timeId: note.timeId,
          }),
        }).then(() => {
          setMessage('Успешно сохранено')
        }).catch(e => {
          setMessage('Ошибка: ' + e)
        })
      })
    } else {
      await updateDoc(docRef, {
        sundayNotes: arrayUnion({
          text: note.text,
          title: note.title,
          id: note.id,
          timeId: note.timeId,
        }),
      }).then(() => {
        setMessage('Успешно сохранено')
      }).catch(e => {
        setMessage('Ошибка: ' + e)
      })
    }
  }

  async function getNews(force = false) {
    if (newsListener.value && !force) return
    if (force) safeUnsubscribe(newsListener)
    startLoading()
    try {
      newsListener.value = await snapshotPromise(collection(db, 'newsfeed'), (snapshot) => {
        snapshot.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          if (!newsIds.value.includes(id)) {
            newsIds.value.push(id)
            news.value.unshift({...data, id})
          }
        })
      })
    } catch (e) {
      setMessage(e.message)
      throw e
    } finally {
      finishLoading()
    }
  }

  async function getNewsItem(newsId) {
    const newsSnap = await getDoc(doc(db, 'newsfeed', newsId))
    if (newsSnap.exists()) newsItem.value = newsSnap.data()
  }

  async function getStories(force = false) {
    if (storiesListener.value && !force) return
    if (force) safeUnsubscribe(storiesListener)
    startLoading()
    try {
      storiesListener.value = await snapshotPromise(collection(db, 'stories'), (snapshot) => {
        snapshot.forEach(doc => {
          const id = doc.id
          const data = doc.data()
          if (!storiesIds.value.includes(id)) {
            storiesIds.value.push(id)
            stories.value.unshift({id, ...data})
          }
        })
      })
    } catch (e) {
      setMessage(e.message)
      throw e
    } finally {
      finishLoading()
    }
  }

  const sgLeadersData = ref([])

  async function getSGLeaders() {
    const leadersSnapshoot = await getDocs(collection(db, 'sgLeaders'))
    leadersSnapshoot.forEach(doc => {
      const data = {...doc.data(), id: doc.id}
      const ids = sgLeadersData.value.map(el => el.id)
      if (!ids.includes(doc.id)) sgLeadersData.value.push(data)
    })
  }

  // ------------------------------------------------------------------------------------------------------------------------------ admin Funcs
  async function uploadNews(imgs, payload) {
    const newsId = `${+new Date()}`
    let filePath
    let url
    let image

    try {
      // get image from fileInput array
      imgs.forEach(img => {
        image = img
      })
      filePath = `newsfeed/${newsId}/${image.name}`
      // upload image
      await uploadBytes(sref(storage, filePath), image)
      url = await getDownloadURL(sref(storage, filePath))
      // save to db
      await setDoc(doc(db, 'newsfeed', newsId), {
        title: payload.title,
        subtitle: payload.subtitle,
        text: payload.text,
        leader: payload.leader,
        form: payload.form,
        formSchema: payload.formSchema,
        url: url,
        filePath: filePath,
      })
      await alert('All done, news saved')
    } catch (e) {
      console.log(e)
    }
  }

  async function deleteNewsItem(newsItem) {
    await deleteObject(sref(storage, newsItem.filePath))
    await deleteDoc(doc(db, 'newsfeed', newsItem.id))
    await alert('all done')
  }

  async function deleteStoryItem(storyItem) {
    await deleteObject(sref(storage, storyItem.filePath))
    await deleteDoc(doc(db, 'newsfeed', storyItem.id))
    await alert('all done')
  }

  async function uploadStory(prevImg, storyImgs, title, link, linkColor, linkLabel) {
    const storyId = Date.now().toString()

    try {
      // getting preview image form array
      let previewImg
      prevImg.forEach(img => {
        previewImg = img
      })
      // path in storage
      const previewImgPath = `stories/${storyId}/${previewImg.name}`
      // uploading img to storage
      await uploadBytes(sref(storage, previewImgPath), previewImg)
      // getting img url in storage
      const previewImgUrl = await getDownloadURL(sref(storage, previewImgPath))

      // same as prev, but to group of imgs, and save its path & url to array
      const storyImages = []
      for (const strImg of storyImgs) {
        const strImgPath = `/stories/${storyId}/storyImgs/${strImg.name}`
        await uploadBytes(sref(storage, strImgPath), strImg)
        let strImgUrl = await getDownloadURL(sref(storage, strImgPath))
        storyImages.push({strImgPath, strImgUrl})
      }

      await setDoc(doc(db, 'stories', storyId), {
        previewImgUrl,
        previewImgPath,
        storyImages,
        title,
        link,
        linkColor,
        linkLabel,
      })
      await alert('all done successfully')
    } catch (e) {
      console.log(e)
    }
  }

  async function updateSunday(payload) {
    const timeId = Date.now().toString()
    await setDoc(doc(db, 'sunday', timeId), {
      text: payload.text,
      title: payload.title,
      id: payload.id,
      timeId,
    })
    await alert('Обновлено')
  }

  async function setSGLeader(payload) {
    const id = +new Date()
    await setDoc(doc(db, 'sgLeaders', id.toString()), payload)
    await alert('All done')
  }

  return {
    getSunday,
    saveSundayNotes,
    getStories,
    getNews,
    getNewsItem,
    news,
    stories,
    newsItem,
    sunday,
    sgLeadersData,
    getSGLeaders,
    // -------------------------- admin Funcs
    uploadNews,
    deleteNewsItem,
    deleteStoryItem,
    uploadStory,
    updateSunday,
    setSGLeader,
  }
})
