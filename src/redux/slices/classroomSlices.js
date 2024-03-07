import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import axiosInstance from '../../helpers/axiosinstance'
import { BsCloudFog } from 'react-icons/bs'

const initialState = {
  DoutData: '',
  data: ''
}

export const sendDout = createAsyncThunk('/fill-doubt', async data => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json'
      }
    }

    const res = axiosInstance.post('/student/Doubt/ask-Dout', data, config)
    toast.promise(res, {
      loading: 'Wait! send your Doubt',

      success: data => {
        return data?.data?.message
      },
      error: 'Failed to send Doubt'
    })
    console.log('|classrommm', data)
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})

export const fetaAllDoubts = createAsyncThunk('/my-doubts', async data => {
  console.log('daga', data)
  try {
    const res = await axiosInstance.get(`/student/Doubt/fetch-AllDout/${data}`)

    console.log('aalo')
    toast.promise(res, {
      loading: 'Wait! to load your doubts',

      success: data => {
        return data?.data?.message
      },
      error: 'Failed to load your doubts'
    })
    return (await res).data
  } catch (error) {
    toast.error(error?.response?.data?.message)
  }
})

// admin fetch all doubts

export const AdminfetaAllDoubts = createAsyncThunk(
  '/admin-dashboard',
  async () => {
    try {
      const res = axiosInstance.get('/admin-dashboard/student-doubts')

      console.log('aalo')
      toast.promise(res, {
        loading: 'Wait! to load your doubts',

        success: data => {
          return data?.data?.message
        },
        error: 'Failed to load your doubts'
      })
      return (await res).data
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }
)

const classroomSlices = createSlice({
  name: 'Doubt',

  initialState,
  reducers: {}
})

export default classroomSlices.reducer
