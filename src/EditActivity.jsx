import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import './EditActivity.css'
import bike_icon from './images/bike_icon.png'
import hike_icon from './images/hike_icon.png'
import run_icon from './images/run_icon.png'
import walk_icon from './images/walk_icon.png'
import swim_icon from './images/swim_icon.png'
import Joi from 'joi'
import { Swiper, SwiperSlide} from 'swiper/react'
import { Navigation } from "swiper";
import 'swiper/css'
import 'swiper/css/navigation'

function EditActivity() {
  const [isSelect, setIsSelect] = useState('')
  const [editData, setEditData] = useState({activity:"", activityName:"", activityDetail:"", timeStart:"", timeEnd:"", distance:""})
  const [db, setDb] = useState([])
  const [activityError, setActivityError] = useState("")
  const [activityNameError, setActivityNameError] = useState("")
  const [activityDetailError, setActivityDetail] = useState("")
  const [timeStartError, setTimeStartError] = useState("")
  const [timeEndError, setTimeEndError] = useState("")
  const [distanceError, setDistanceError] = useState("")

  function handlerSelect(selected){
    if(selected===isSelect){
      setIsSelect('')
      setEditData(prev => ({...prev, activity:""}))
    }else{
      setIsSelect(selected)
    }
  }

  useEffect(()=>{
    setEditData(prev => ({...prev, activity:isSelect}))
  }, [isSelect])

  const validateForm = () => {
    setActivityError("")
    setActivityNameError("")
    setActivityDetail("")
    setTimeStartError("")
    setTimeEndError("")
    setDistanceError("")
    const {error, value} = editSchema.validate(editData, { abortEarly: false})
    if(error){
      error.details.forEach(err => {
        if(err.path[0]==='activity'){
          setActivityError("must select a activity by clicking on icon")
        }
      if(err.path[0]==='activityName'){
        setActivityNameError(err.message)
      }
      if(err.path[0]==='activityDetail'){
        setActivityDetail(err.message)
      }
      if(err.path[0]==='timeStart'){
        setTimeStartError(err.message)
      }
      if(err.path[0]==='timeEnd'){
        setTimeEndError(err.message)
      }
      if(err.path[0]==='distance'){
        setDistanceError(err.message)
      }
    })}
  }
  
  useEffect(validateForm, [editData])

  function handlerChange(e){
    const name = e.target.name
    const value = e.target.value
    setEditData(prev=>({...prev, [name]: value}))
  }

  const editSchema = Joi.object({
    activity: Joi.string().required(),
    activityName: Joi.string().min(3).required(),
    activityDetail: Joi.string().min(3).required(),
    timeStart: Joi.string().min(3).required(),
    timeEnd: Joi.string().min(3).required(),
    distance: Joi.string().required(),
  })

  function handlerUpdate(e){
    e.preventDefault()
    const {error, value} = editSchema.validate(editData, { abortEarly: false})
    if(error){
      alert("cannot send form, please fill every input box")
    }else{
      setDb([...db, editData])
      setEditData({})
      setIsSelect("")
      alert("update success")
      console.log(value)
    }
  }

  return (
     <div>
       <Navbar />
      <div className='EditActivity-page'>
        <div className='EditActivity-formbox'>
          <h2>Edit activity</h2>
          <Swiper
          className='EditActivity-icon'
          modules={[Navigation]}
          navigation={true} 
          spaceBetween={0}
          slidesPerView={3}
          style={{
            "--swiper-pagination-color": "#066c6b",
            "--swiper-navigation-color": "#066c6b",
          }}
          breakpoints={{
            375:{slidesPerView:1},
            760:{slidesPerView:2},
            1040:{slidesPerView:3}
          }}
          >
            <SwiperSlide><button onClick={()=>handlerSelect('bike')} style={{backgroundColor:isSelect==='bike'?'#ef4b3f':null}}><img src={bike_icon} /></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('hike')} style={{backgroundColor:isSelect==='hike'?'#ef4b3f':null}}><img src={hike_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('run')} style={{backgroundColor:isSelect==='run'?'#ef4b3f':null}}><img src={run_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('walk')} style={{backgroundColor:isSelect==='walk'?'#ef4b3f':null}}><img src={walk_icon}/></button></SwiperSlide>
            <SwiperSlide><button onClick={()=>handlerSelect('swim')} style={{backgroundColor:isSelect==='swim'?'#ef4b3f':null}}><img src={swim_icon}/></button></SwiperSlide>
          </Swiper>
          <span><p>selected activity : {isSelect}</p></span>
          <p>{activityError}</p>
          <input type='text' placeholder='Activity Name' name='activityName' value={editData.activityName||""} onChange={handlerChange} style={{backgroundColor:activityNameError&&editData.activityName?"salmon":null}}/>
          <p>{activityNameError&&editData.activityName?activityNameError:""}</p>
          <input type='text' placeholder='Activity Detail' name='activityDetail' value={editData.activityDetail||""} onChange={handlerChange} style={{backgroundColor:activityDetailError&&editData.activityDetail?"salmon":null}}/>
          <p>{activityDetailError&&editData.activityDetail?activityDetailError:""}</p>
          <input type='datetime-local' placeholder='Time' name='timeStart' value={editData.timeStart||""} onChange={handlerChange} style={{backgroundColor:timeStartError&&editData.timeStart?"salmon":null}}/>
          <p>{timeStartError&&editData.timeStart?timeStartError:""}</p>
          <input type='datetime-local' placeholder='Time' name='timeEnd' value={editData.timeEnd||""} onChange={handlerChange} style={{backgroundColor:timeEndError&&editData.timeEnd?"salmon":null}}/>
          <p>{timeEndError&&editData.timeEnd?timeEndError:""}</p>
          <input type='number' placeholder='Distance' name='distance' value={editData.distance||""} onChange={handlerChange} style={{backgroundColor:distanceError&&editData.distance?"salmon":null}}/>
          <p>{distanceError&&editData.distance?distanceError:""}</p>
          <input type='file' />
          {/* <p></p> */}
          <button onClick={handlerUpdate}>Update</button>
        </div>
      </div>
     </div>
  )
}

export default EditActivity