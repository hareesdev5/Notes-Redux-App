import { Formik } from 'formik'
import { FaRegFileLines } from 'react-icons/fa6';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri'
import { Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Button } from 'react-bootstrap'
import React, { useContext, useEffect, useState} from 'react'
import { noteDataContext } from '../context/noteContext';

import * as Yup from 'yup'
import axios from 'axios';

function addnote() {

  let {API} = useContext(noteDataContext)

  let [data,setData] = useState([])

  let [initialValue,setInitialValue] = useState({
    id:null,
    title:'',
    content:''
  })
  let userSchema = Yup.object().shape({
    title:Yup.string().required('* Required'),
    content:Yup.string().required('* Required')
  })


  let getData = async (id) =>{
    try {
      if(id){
        let res = await axios.get(`${API}/${id}`)
        if(res.status== 200){
          setInitialValue(res.data)
        }
      }
      else{
        let res = await axios.get(API)
        if(res.status == 200){
          setData(res.data)
        }
      }
    } catch (error) {
      toast.success('Internal server')
    }
  }

 let addUser= async(values)=>{
    let newArray = [...data]
    newArray.push(values)
    setData(newArray)
    toast.success("Added Successful")
    try {
      let res = await axios.post(API, values)
      if(res.status == 201){
        setInitialValue({
          id:null,
          title:'',
          content:''
        })
      }
    } catch (error) {
      toast.error("error occured")
    }
 }

  let deleteUser = async(id,index)=>{
    let newArray = [...data]
    newArray.splice(index,1)
    setData(newArray)
    toast.success('Deleted Successful')
    try {
      let res = await axios.delete(`${API}/${id}`)
      if(res.status == 200){
        getData()
      }
    } catch (error) {
      toast.error('error')
    }
  }

  
  const editUser = async (id) => {
		try {
			let res = await axios.get(`${API}/${id}`);
			if (res.status === 200) {
				setInitialValue(res.data);
        toast.success('Ready for Edit ')
			}
		} catch (error) {
			toast.error('Internal Server Error');
		}
	};


  let updateUser = async (id,values)=>{
    try {
      let res = await axios.put(`${API}/${id}`,values)
      if(res.status == 200){
        getData()
        toast.success('Updated Successful')
        setInitialValue({
          id:null,
          title:'',
          content:''
        })
      }
    } catch (error) {
      toast.error('Error occured')
    }
  }


  useEffect(()=>{
    getData()
  },[])
  return (
    <div className='w-75' style={{backgroundColor:'#d8e2f2'}}>
      <div className='mx-4 my-2 ' >
      <Formik
      enableReinitialize={true}
      initialValues={initialValue}
      validationSchema={userSchema}
      onSubmit={(values,{setSubmitting,resetForm})=>{
        setSubmitting(true);

        if(initialValue.id){
          updateUser(initialValue.id,values)
        }
        else{
          addUser(values)
        }
        resetForm();
        setSubmitting(false);
      }}
      >
        {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting
      })=>(
        <Form className='m-2 h-25 p-4 bg-white shadow-lg' style={{borderRadius:'20px',maxWidth:'1000px',maxHeight:'340px'}} onSubmit={handleSubmit}>
          <h3 className='f-color'>Add a Note</h3>
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="floatingInput" name='title' value={values.title} placeholder="Title" style={{borderStyle:'none'}} onChange={handleChange} onBlur={handleBlur}/>
            <label  className='h6 f-color'>Title</label>
            {errors.title && touched.title ? <div style={{color:'red'}}>{errors.title}</div>:null}
          </div>
          <div className="form-floating">
            <textarea className="form-control" placeholder="Leave a comment here" name='content' value={values.content} id="floatingTextarea2" style={{height: '100px',borderStyle:'none'}} onChange={handleChange} onBlur={handleBlur}></textarea>
            <label  className='h6 f-color'>Take a note...</label>
            {errors.content && touched.content ? <div style={{color:'red'}}>{errors.content}</div>:null}
          </div>
          <div className='d-flex align-item-center justify-content-end '>
            <Button className='mt-2' type='submit' disabled={isSubmitting} >{initialValue.id ? 'Update note' : 'Add note'}</Button>
          </div>
       </Form>
        )}
          
      </Formik>    
        <div className='mt-4 m-3'>
            <div className='flex gap-5 flex-nowrap overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 py-2'>
            <div className=''>
              <div className=' d-flex f-color' style={{fontSize:'20px'}}>
                <FaRegFileLines/> 
                &nbsp;
                 &nbsp;
                <h5 className='f-color' style={{fontWeight:'700'}} >My Notes</h5>
              </div>
              <span className='ml-5 f-color' style={{fontWeight:'700',fontSize:'13px'}}>Recently viewed</span>
            </div>
            <div  className='d-inline-flex gap-5 my-4 scroll' >
              {data.map((e,i)=>(
                <div  className='bg-white shadow-md m-2 scrollbar-track-transparent'style={{minWidth:'200px',maxWidth:'200px',maxHeight:'200px',borderRadius:'20px'}} key={i} >
                 <div className='d-flex m-3 justify-content-between '>
                    <h5 className='text-uppercase f-color fw-bold'>{e.title}</h5>                  
                    <div role='button'  >
                      &nbsp;
                    <MdOutlineModeEditOutline onClick={()=>editUser(e.id)}/>
                      &nbsp;
                    <RiDeleteBin6Line onClick={()=>deleteUser(e.id,i)} />
                    </div>
                  </div>
                 <div  className=' m-3 '>
                  <div className='text-capitalize overflow-scroll 'style={{height:'130px',fontSize:'12px'}}>{e.content}</div>
                 </div>
                </div>
               
              ))}
             </div>
            </div>
            <div>
           </div>
         </div>  
        </div>
      </div>
  )
}

export default addnote
