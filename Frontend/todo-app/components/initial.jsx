// import React, { useEffect, useState } from "react"
// import axios from "axios"

// const Todo=()=>{

//     const [title,setTitle]=useState("")
//     const [desc,setDesc]=useState("")
//     const [error,setError]=useState("")
//     const [msg,setmsg]=useState("")
//     const [todos,setTodos]=useState([])
//     const [id,setId]=useState(-1)

//     const [editTitle,setEditTitle]=useState("")
//     const [editDesc,setEditDesc]=useState("")
//     const url="http://localhost:3000"

//     const handleSubmit= async (e)=>{
//         setError("")
//         if(title.trim() !=='' && desc.trim() !=='')
//         {
            
//             await axios.post(url+"/todo",{title,description:desc})
//             .then((response)=>
//             {
//                 setTodos([...todos,{title,desc}])
//                 setmsg("item added sucessfully")
//                 setTimeout(()=>
//                 {
//                     setmsg("")
//                 },3000)
//             })
//             .catch((error)=>
//             {
//                 setError("Error inserting data")
//                 setTimeout(()=>
//                     {
//                         setError("")
//                     },3000)
                
//                 console.log("Error:",error)
//             })
//         }

//     }

//     const getItems=async()=>
//     {
//         const items=await axios.get(url+"/todo")
//         setTodos(items.data)

//     }
    
//     useEffect(()=>
//         {
//             getItems()
            
//         },[])

//     const handleEdit=(el)=>
//     {
//         setId(el._id); 
//         setEditTitle(el.title); 
//         setEditDesc(el.description)
//     }
//     const handleUpdate=async()=>
//     {
//         setError("")
//         if(editTitle.trim() !=='' && editDesc.trim() !=='')
//         {
            
//             await axios.put(url+"/todo/"+id,{title:editTitle,description:editDesc})
//             .then((response)=>
//             {
//                 const updatedToDos=todos.map((el)=>{
//                     if(el.id == id)
//                     {
//                         el.title=editTitle
//                         el.description=editDesc
//                     }
//                     return el

//                 })
//                 setTodos(updatedToDos)
//                 setmsg("item updated sucessfully")
//                 setTimeout(()=>
//                 {
//                     setmsg("")
//                 },3000)
//                 setId(-1)
//             })
//             .catch((error)=>
//             {
//                 setError("Error inserting data")
//                 setTimeout(()=>
//                     {
//                         setError("")
//                     },3000)
            
                
//                 console.log("Error:",error)
//             })
//         }


//     }
//     const handleEditCancel=()=>
//     {
//         setId(-1)
//     }
        
    
//      return(
//         <>
//         <div className="row p-3 bg-success text-light">
//             <h1>ToDo Project With MERN Stack</h1>
//         </div>
//         <div className="row"> 
//             <h3>Add item</h3>
//             {msg && <p className="text-success">{msg}</p>} 
//             <div className="form-group d-flex gap-2">
//                 <input className="form-control" onChange={(e)=> setTitle(e.target.value)} value={title} placeholder="Title" type="text" />
//                 <input className="form-control" onChange={(e)=> setDesc(e.target.value)} value={desc} placeholder="Description" type="text" />
//                 <button className="btn btn-dark"  onClick={handleSubmit}>Submit</button>

//             </div>
//             {error && <p className="text-danger">{error}</p>}
//         </div>
//         <div className="row mt-3">
//             <h3>Tasks</h3>
//             <ul className="list-group">
//                 {
//                     todos.map((el)=> <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                    
//                     <div className="d-flex flex-column me-2">
//                         {
//                             id ==-1 || id !== el._id ?
//                             <>
//                                 <span className="fw-bold">{el.title}</span>
//                                 <span >{el.description}</span>
//                             </>
//                             :<>
//                                 <div className="form-group d-flex gap-2">
//                                     <input className="form-control" onChange={(e)=> setEditTitle(e.target.value)} value={editTitle} placeholder="Title" type="text" />
//                                     <input className="form-control" onChange={(e)=> setEditDesc(e.target.value)} value={editDesc} placeholder="Description" type="text" />

//                                 </div>

//                             </>                            
//                         }

                        
                        
//                     </div>
//                     <div className="d-flex gap-2">
//                         {
//                             id == -1 || id !== el._id? <>
//                             <button className="btn btn-warning" onClick={()=>handleEdit(el)}>Edit</button>
//                             <button className="btn btn-danger">Delete</button>
//                             </>:
//                             <>
//                             <button onClick={handleUpdate}>Update</button>
//                             <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
//                             </>
//                         }
                        
//                      </div>
//                 </li>)
//                 }
//             </ul>

//         </div>

//         </>
//     )
// }

// export default Todo






import React, { useEffect, useState } from "react"
import axios from "axios"

const Todo = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState("")
    const [msg, setMsg] = useState("")
    const [todos, setTodos] = useState([])
    const [id, setId] = useState(-1)

    const [editTitle, setEditTitle] = useState("")
    const [editDesc, setEditDesc] = useState("")
    const url = `${import.meta.env.VITE_API_URL}`

    const handleSubmit = async (e) => {
        setError("")
        if (title.trim() !== '' && desc.trim() !== '') {
            try {
                await axios.post(url + "/todo", { title, description: desc })
                setTodos([...todos, { title, description: desc }])
                setMsg("Item added successfully")
                setTimeout(() => {
                    setMsg("")
                }, 3000)
                setTitle("")
                setDesc("")
            } catch (error) {
                setError("Error inserting data")
                setTimeout(() => {
                    setError("")
                }, 3000)
                console.log("Error:", error)
            }
        }
    }

    const getItems = async () => {
        try {
            const items = await axios.get(url + "/todo")
            setTodos(items.data)
        } catch (error) {
            console.error("Error fetching items:", error)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    const handleEdit = (el) => {
        setId(el._id)
        setEditTitle(el.title)
        setEditDesc(el.description)
    }

    const handleUpdate = async () => {
        setError("")
        if (editTitle.trim() !== '' && editDesc.trim() !== '') {
            try {
                await axios.put(url + "/todo/" + id, { title: editTitle, description: editDesc })
                const updatedToDos = todos.map((el) => {
                    if (el._id === id) {
                        el.title = editTitle
                        el.description = editDesc
                    }
                    return el
                })
                setTodos(updatedToDos)
                setMsg("Item updated successfully")
                setTimeout(() => {
                    setMsg("")
                }, 3000)
                setId(-1) // Reset editing mode
            } catch (error) {
                setError("Error updating data")
                setTimeout(() => {
                    setError("")
                }, 3000)
                console.log("Error:", error)
            }
        }
    }

    const handleEditCancel = () => {
        setId(-1)
    }

    const handleDelete = async (id) => {
        try {
            if(window.confirm("Do you Want to Delete!!!"))
            {
                await axios.delete(url + "/todo/" + id)
                setTodos(todos.filter((el) => el._id !== id)) 

            }
            
        } catch (error) {
            console.log("Error deleting item:", error)
        }
    }

    return (
        <>
            <div className="row p-3 bg-success text-light">
                <h1>ToDo Project With MERN Stack</h1>
            </div>
            <div className="row">
                <h3>Add item</h3>
                {msg && <p className="text-success">{msg}</p>}
                <div className="form-group d-flex gap-2">
                    <input className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title" type="text" />
                    <input className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Description" type="text" />
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>
            <div className="row mt-3">
                <h3>Tasks</h3>
                <ul className="list-group">
                    {
                        todos.map((el) => (
                            <li className="list-group-item bg-info d-flex justify-content-between align-items-center my-2" key={el._id}>
                                <div className="d-flex flex-column me-2">
                                    {id === -1 || id !== el._id ? (
                                        <>
                                            <span className="fw-bold">{el.title}</span>
                                            <span>{el.description}</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="form-group d-flex gap-2">
                                                <input className="form-control" onChange={(e) => setEditTitle(e.target.value)} value={editTitle} placeholder="Title" type="text" />
                                                <input className="form-control" onChange={(e) => setEditDesc(e.target.value)} value={editDesc} placeholder="Description" type="text" />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="d-flex gap-2">
                                    {id === -1 || id !== el._id ? (
                                        <>
                                            <button className="btn btn-warning" onClick={() => handleEdit(el)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(el._id)}>Delete</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                                            <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Todo
