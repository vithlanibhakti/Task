import React, { useEffect, useState } from 'react'
import { axiosGet } from '../../Helpers/CommonHelper';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import BookTickets from '../BookTickets/BookTickets';
import { Toast } from '../../Helpers/CommonHelper';
import { useNavigate } from "react-router-dom";

import Button from '@material-ui/core/Button';
import { Card } from '@mui/material';
const SourceAutoSuggestions = React.lazy(() => import("../AutoSuggestions/SourceAutoSuggestions"));
const DestinationAutoSuggestions = React.lazy(() => import("../AutoSuggestions/DestinationAutoSuggestions"));

function Dashboard() {
    let response;
    const [flightData, setFlightData] = useState()
    let Sources = [];
    let uniqueSources = [];
    let uniqueDestination = [];
    let Destination = [];
    const navigation = useNavigate()
    async function getFlightsDetails() {
        let reqUrl = ''
        let reqBody = {
        }
        response = await axiosGet(reqUrl, reqBody)
        setFlightData(response?.data)
    }
    useEffect(() => {
        getFlightsDetails();
    }, [])
    const [startDate, setStartDate] = useState(new Date());
    const handleSubmit = async () => {
        let reqUrl = 'searchflights'
        let reqBody = {
            date: new Date(startDate).toISOString().split("T")[0],
            source: JSON.parse(localStorage.getItem('source')) || '',
            destination: JSON.parse(localStorage.getItem('destination')) || '',
        }
        let response = await axiosGet(reqUrl, reqBody)
        if (response?.data?.data.length <= 0) {
            Toast.fire({
                icon: 'sucess',
                title: response?.data?.message
            })
        }
        else {
            navigation("/booking", { state: response.data });
        }
    };

    return (
        <>
            
            <Card variant="outlined">
Sources
            {
                flightData && flightData.map(function (item, index) {
                    uniqueSources = [...new Set(Sources)];
                    uniqueDestination = [...new Set(Destination)];
                    Sources.push(item?.flightsSource)
                    Destination.push(item?.flightsDestination)
                })
            }
            <SourceAutoSuggestions suggestions={uniqueSources || []} />
            Destination
            <DestinationAutoSuggestions suggestions={uniqueDestination || []} />
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                minDate={moment().toDate()}
            />
            <Button className="button" onClick={handleSubmit} type="submit">
                Search Flights
            </Button>
</Card>
        </>
    )
}

export default Dashboard