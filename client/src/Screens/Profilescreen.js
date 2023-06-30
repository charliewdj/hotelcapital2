import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import Swal from 'sweetalert2'

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem('currentUser'))

    useEffect(() => {
        if (!user) {
            window.location.href = '/login'
        }
    }, [])


    return (
        <div className='ml-3 mt-3'>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>

                    <br />

                    <h1>Name: {user.name}</h1>
                    <h1>Email: {user.email}</h1>
                    <h1>Is Admin: {user.isAdmin ? 'Yes' : 'No'}</h1>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bookings" key="2">
                    <MyBookings />
                </Tabs.TabPane>

            </Tabs>
        </div>
    )
}

export default Profilescreen




export function MyBookings() {

    const user = JSON.parse(localStorage.getItem('currentUser'))
    const [bookings, setbookings] = useState([])
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState();

    useEffect(() => {

        async function fetchData() {

            try {
                setloading(true)
                const data = await (await axios.post('/api/bookings/getbookingsbyuserid/', { userid: user._id })).data
                console.log(data)
                setbookings(data)
                setloading(false)

            } catch (error) {

                console.log(error)
                setloading(false)
                seterror(error)
            }

        }

        fetchData()

    }, [])

    async function cancelBooking({ bookingid, roomid }) {
        try {
            //buat test apakah bookingid tersampaikan atau tidak ?
            console.log(bookingid)
            setloading(true)
            const result = await (await axios.post("/api/bookings/cancelBooking", { bookingid, roomid })).data
            console.log(result)
            setloading(false)
            Swal.fire('おめでとう','予約キャンセルされました', 'success').then(result=>{
                window.location.reload()
            })

        } catch (error) {
            console.log(error)
            setloading(false)
            Swal.fire('エラー', '予約キャンセル失敗しました', 'error')
        }
    }


    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {loading && <Loader />}
                    {bookings && (bookings.map(booking => {

                        return <div className='bs'>
                            <h1>{booking.room}</h1>
                            <p><b>BookingId</b>: {booking._id}</p>
                            <p><b>Check In</b> : {booking.fromdate}</p>
                            <p><b>Check Out</b> : {booking.todate}</p>
                            <p><b>Amount </b>: {booking.totalamount}</p>
                            <p><b>Status</b> : {booking.status == 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>

                            {booking.status !== 'cancelled' && (<div className='text-right'>
                                <button class='btn btn-primary' onClick={() => { cancelBooking({bookingid : booking._id, roomid: booking.roomid})}}>Cancel Booking</button>
                            </div>)}
                        </div>
                    }))}
                </div>
            </div>
        </div>
    )
}
