import React, { useState, useEffect } from 'react'
import './List.css'
import axios from 'axios'
var years = []

for (var i = 2006; i <= 2020; i = i + 2) {
    var obj = {}
    obj["id"] = i
    obj["first"] = i
    if (i != 2020)
        obj["second"] = i + 1
    years.push(obj)
}
const List = () => {
    const [state, setstate] = useState({ datas: [] })
    useEffect(() => {
        let isCancelled = false;
        const fetchApi = async () => {

            try {
                const res = await axios.get('https://api.spaceXdata.com/v3/launches?limit=100')
                if (!isCancelled) {
                    setstate({
                        ...state,
                        datas: res.data
                    })
                }
            } catch (e) {
                window.alert(e)
            }
        }
        fetchApi()
        return () => {
            isCancelled = true;
        }
    }, [])


    const handleYear = async (year) => {
        try {
            const res = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${year}`)

            setstate({
                ...state,
                datas: res.data
            })
        } catch (e) {
            window.alert(e)
        }
    }

    const handleLaunch = async (value) => {
        try {
            const res = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${value}`)

            setstate({
                ...state,
                datas: res.data
            })
        } catch (e) {
            window.alert(e)
        }
    }

    const handleLanding = async (value) => {
        try {
            const res = await axios.get(`https://api.spaceXdata.com/v3/launches?limit=100&landing_success=${value}`)

            setstate({
                ...state,
                datas: res.data
            })
        } catch (e) {
            window.alert(e)
        }
    }
    return (

        <div className="container1">
            <div className="col-left py-2 px-2">
                <div className="col1">

                    <h5>Filters</h5>
                    <div>
                        <h6 className="center-text">Launch year</h6>
                        <hr style={{ width: '10rem' }} />
                        {
                            years.map(year =>
                                <div className="year-info py-1" key={year.id}>
                                    <button onClick={() => handleYear(year.first)}>{year.first}</button>
                                    {
                                        (year.second) ? (
                                            <button onClick={() => handleYear(year.second)}>{year.second}</button>
                                        ) : null
                                    }
                                </div>
                            )
                        }
                    </div>

                    <div>
                        <h6 className="center-text">Successfull Launch</h6>
                        <hr style={{ width: '10rem' }} />
                        <div className="year-info py-1" >
                            <button onClick={() => handleLaunch(true)}>True</button>
                            <button onClick={() => handleLaunch(false)}>False</button>
                        </div>
                    </div>

                    <div>
                        <h6 className="center-text">Successfull Landing</h6>
                        <hr style={{ width: '10rem' }} />
                        <div className="year-info py-1" >
                            <button onClick={() => handleLanding(true)}>True</button>
                            <button onClick={() => handleLanding(false)}>False</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="col-right">
                {
                    (state.datas.length === 0) ? (
                        <h1>Loading...</h1>
                    ) : (
                            <div className="card-columns">
                                {
                                    state.datas.map((data, i) => {

                                        let land_success = data.rocket.first_stage.cores.find(core => core.land_success)
                                        return (
                                            <div className="card" key={i}>
                                                <div className="my-2 py-2 mx-2" style={{ background: 'lightgray' }}>
                                                    <img className="card-img" src={data.links.mission_patch_small} alt="Card image cap" />
                                                </div>
                                                <div className="card-body">
                                                    <h5 className="card-title values" >{`${data.mission_name} #${data.flight_number}`}</h5>
                                                    <div className="card-body">
                                                        <h5>Mission Ids:</h5>
                                                        <ul>
                                                            {
                                                                data.mission_id.map((id, i) =>
                                                                    <li key={i} className="values">{id}</li>
                                                                )
                                                            }
                                                        </ul>
                                                        <h5>Launch Year:</h5>
                                                        <h5 className="values">{data.launch_year}</h5>
                                                        <h5>Successfull Launch: </h5>
                                                        {
                                                            (data.launch_success) ? (
                                                                <h5 className="values">True</h5>
                                                            ) : (
                                                                    <h5 className="values">False</h5>
                                                                )
                                                        }

                                                        <h5>Successfull Landing:</h5>
                                                        {
                                                            (land_success) ? (
                                                                <h5 className="values">True</h5>
                                                            ) : (
                                                                    <h5 className="values">False</h5>
                                                                )
                                                        }

                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }
                                    )
                                }



                            </div>

                        )
                }

            </div>

        </div>
    )
}

export default List
