import React, { useState } from 'react';
import MuiDate from './MuiDate';
import styled from 'styled-components';


const Item = styled.div`
    display:inline-flex;
    justify-content: ${props => props.align};
    align-items: center;
    width:70%;
`;


function CumulativeControls({ data, formData, setFormData }) {


        

    const minmaxDate = {
        minDate: data.data.dates.firstDate,
        maxDate: data.data.dates.lastDate
    }




    // const handleChangeRadio = (event) => {
    //     setFormData({
    //         ...formData,
    //         onDate: event.target.value === "rangeDate" ? false : true
    //     })
    //     console.log("Change");
    // };

    var onDatedef = formData.onDateData === null ? minmaxDate.maxDate : formData.onDateData;

    return (
        <div>

            <Item className="start-lastdate" align="space-around">
                <div>Set Date:</div>
                <MuiDate label="On Date" defaultDate={onDatedef}
                    maxDate={minmaxDate.maxDate} minDate={minmaxDate.minDate}
                    disabled={false}
                    callbackChange={setFormData}
                    value="onDateData"
                    formData={formData}
                />
            </Item>
        </div>
    )
}

export default CumulativeControls
