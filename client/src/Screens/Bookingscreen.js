import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Loader from '../Components/Loader';
import Error from '../Components/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import swal from 'sweetalert'

function Bookingscreen() {

  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();

  const fromdate_1 = moment(fromdate, 'DD-MM-YYYY')
  const todate_1 = moment(todate, 'DD-MM-YYYY')
  const totaldays = moment.duration(todate_1.diff(fromdate_1)).asDays() + 1

  const [loading, setloading] = useState();
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const [totalamount, settotalamount] = useState()


  useEffect(() => {

    if(!(localStorage.getItem('currentUser'))){
      window.location.reload = '/login'
    }

    async function fetchData() {

      try {
        setloading(true)
        const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid, })).data

        settotalamount(totaldays * data.rentperday)
        setroom(data)
        setloading(false)
        
      }

      catch (error) {
        seterror(true)
        console.log(error)
        setloading(false)
      }
    }

    fetchData()

  }, [])

  //async function bookRoom() {
   // const bookingDetails = {

   //   room,
    //  userid: JSON.parse(localStorage.getItem('currentUser'))._id,
    //  fromdate_1,
   //   todate_1,
    //  totalamount,
   //   totaldays
  //  }

  //  try {
    //  const result = await axios.post('/api/bookings/bookroom', bookingDetails)


  //  } catch (error) {

   // }
  //}

  async function onToken(token) {

    console.log(token)

    const bookingDetails = {

      room,
      userid: JSON.parse(localStorage.getItem('currentUser'))._id,
      fromdate_1,
      todate_1,
      totalamount,
      totaldays,
      token
    }

    try {

      setloading(true)
      const result = await axios.post('/api/bookings/bookroom', bookingDetails)
      setloading(false)
      swal('Congratulations', 'Your Room Booked Successfully', 'success').then(result => {
        window.location.href = '/profile'
      })


    } catch (error) {
      setloading(false)
      swal('Oops', 'Something Went Wrong', 'error')
    }

  }

  return (
    <div className='m-5'>

      {loading ? (<h1><Loader /></h1>) : room ? (<div>

        <div className='row justify-content-center mt-5 bs'>

          <div className='col-md-6'>
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} clasName='bigimg' />
          </div>

          <div className='col-md-6'>
            <div style={{ textAlign: 'right' }}>
              <h1>Booking Details</h1>
              <hr />

              <b>
                <p>ホテル名 : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                <p>チェックイン日付け : {fromdate}</p>
                <p>チェックアウト日付け: {todate}</p>
                <p>最大宿泊人数 : {room.maxcount}</p>
              </b>
            </div>

            <div style={{ textAlign: 'right' }}>
              <b>
                <h1>合計金額</h1>
                <hr />
                <p>合計日数 : {totaldays}</p>
                <p>価格 : {room.rentperday}</p>
                <p>合計金額 : {totalamount}</p>
              </b>
            </div>

            <div style={{ float: 'right' }}>


              <StripeCheckout
                amount = {totalamount}
                token={onToken}
                currency = 'JPY'
                stripeKey="pk_test_51LnLoXDrzZ3jiAgjo3Qt7JPo9SlNgqdfMnoBCTa7Id1uOfFzJcLMjuDkeiaDOQbuOiB1OVLIgO7bQDhtW1lZJFM400bh938Ycq"
              >

                <button className='btn btn-primary'>支払いする</button>
              </StripeCheckout>
            </div>

          </div>

        </div>
      </div>) : (<Error />)}

    </div>


  )
}

export default Bookingscreen