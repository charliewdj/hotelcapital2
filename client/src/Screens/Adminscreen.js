import React, { useState, useEffect } from 'react'
import { Descriptions, Tabs } from "antd";
import axios from "axios";
import Loader from '../Components/Loader';
import Error from '../Components/Error';
//import { use } from '../../../routes/roomsRoute';
import Swal from 'sweetalert2'

const { TabPane } = Tabs;

function Adminscreen() {

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("currentUser")).isAdmin) {
            window.location.href = '/home'
        }
    }, [])

    return (
        <div className='mt-3 ml-3 mr-3 bs'>
            <h2 className='text-center' style={{ fontSize: '30px' }}><b>管理画面</b></h2>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="予約" key="1">
                    <Bookings />
                </Tabs.TabPane>
                <Tabs.TabPane tab="ホテルリスト" key="2">
                    <Rooms />
                </Tabs.TabPane>
                <Tabs.TabPane tab="ホテル登録" key="3">
                    <Addroom/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="ユーザー" key="4">
                    <Users />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
}

export default Adminscreen;


// booking list
export function Bookings() {

    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(() => {

        async function fetchData() {
            try {
                const results = await axios.get("/api/bookings/getallbookings")
                setbookings(results.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }

        fetchData()

    }, [])

    return (
        <div className='row'>
            <div className='cold-md-12'>
                <h1>予約</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>予約 Id</th>
                            <th>ユーザー Id</th>
                            <th>ホテル名</th>
                            <th>チェックイン日付け</th>
                            <th>チェックアウト日付け</th>
                            <th>予約状況</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return <tr>
                                <td>{booking._id}</td>
                                <td>{booking.userid}</td>
                                <td>{booking.room}</td>
                                <td>{booking.fromdate}</td>
                                <td>{booking.todate}</td>
                                <td>{booking.status}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

//部屋 list
export function Rooms() {

    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(() => {

        async function fetchData() {
            try {
                const results = await axios.get("/api/rooms/getallrooms")
                setrooms(results.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }

        fetchData()

    }, [])

    return (
        <div className='row'>
            <div className='cold-md-12'>
                <h1>ホテルリスト</h1>
                {loading && (<Loader />)}

                <table className='table table-bordered table-dark'>
                    <thead className='bs thead-dark'>
                        <tr>
                            <th>ホテル ID</th>
                            <th>ホテル名</th>
                            <th>タイプ</th>
                            <th>価格</th>
                            <th>最大宿泊人数</th>
                            <th>電話番号</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return <tr>
                                <td>{room._id}</td>
                                <td>{room.name}</td>
                                <td>{room.type}</td>
                                <td>{room.rentperday}</td>
                                <td>{room.maxcount}</td>
                                <td>{room.phonenumber}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>


            </div>
        </div>
    )
}

//users list
export function Users() {

    const [users, setusers] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    useEffect(() => {

        async function fetchData() {
            try {
                const results = await axios.get("/api/users/getallusers")
                setusers(results.data)
                setloading(false)
            } catch (error) {
                console.log(error)
                setloading(false)
                seterror(error)
            }
        }

        fetchData()

    }, [])

    return (
        <div className='row'>
            <div className='col-md-12'>

                <h1>ユーザー</h1>
                {loading && <Loader />}
                <table className='table table-dark table-bordered'>

                    <thead>
                        <tr>
                            <th>ユーザー Id</th>
                            <th>氏名</th>
                            <th>E メール</th>
                            <th>管理者情報</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && (users.map(user => {
                            return <tr>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'Admin' : 'Not Admin'}</td>
                            </tr>
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


// 部屋追加
export function Addroom() {

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState()
  const[name, setname] = useState('')
  const[rentperday, setrentperday] = useState()
  const[maxcount, setmaxcount] = useState()
  const[description , setdescription] = useState()
  const[phonenumber , setphonenumber] = useState()
  const[type, settype] = useState()
  const[imageurl1, setimageurl1] = useState('')
  const[imageurl2, setimageurl2] = useState('')
  const[imageurl3, setimageurl3] = useState('')

  async function addroom(){

    const newroom ={
        name,
        imageurls:[imageurl1, imageurl2, imageurl3],
        rentperday,
        type,
        maxcount,
        phonenumber,
        description,
    }

    try {
        setloading(true)
        console.log(newroom)
        const result = await (await axios.post('/api/rooms/addroom', newroom)).data
        console.log(result)
        setloading(false)
        Swal.fire('おめでとう', '新しいホテルリストを追加しました', 'success').then(result=>{
            window.location.href = '/home'
        })
    } catch (error) {
        console.log(error)
        setloading(false)
        Swal.fire('エラー', 'ホテルリスト追加を失敗してしまいました', 'error')
    }
  }

  return (
    <div className='row'>
            
        <div className='col-md-5'>
           {loading && <Loader/>}
            <input type="text" className='form-control' placeholder='ホテル名'
            value={name} onChange={(e) => {setname(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='価格'
            value={rentperday} onChange={(e) => {setrentperday(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='最大宿泊人数'
            value={maxcount} onChange={(e) => {setmaxcount(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='ホテルの特徴'
            value={description} onChange={(e) => {setdescription(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='電話番号'
            value={phonenumber} onChange={(e) => {setphonenumber(e.target.value)}}
            />
        </div>

        <div className='col-md-5'>
        
            <input type="text" className='form-control' placeholder='タイプ'
            value={type} onChange={(e) => {settype(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='写真 URL 1'
            value={imageurl1} onChange={(e) => {setimageurl1(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='写真 URL 2'
            value={imageurl2} onChange={(e) => {setimageurl2(e.target.value)}}
            />
            <input type="text" className='form-control' placeholder='写真 URL 3'
            value={imageurl3} onChange={(e) => {setimageurl3(e.target.value)}}
            />

            <div className='text-right'>
                <button className='btn btn-primary mt-2' onClick={addroom}>ホテルを追加</button>
            </div>
        </div>

    </div>
  )
}


