import React, {useEffect, useState} from 'react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CalenderCard from "@/Components/Custom/CalenderCard";
import {AdminDashboardServices} from "@/store/services/DashbordServices";
import Spin from "@/Components/Custom/Spin";
import StaffServices from "@/store/services/StaffServices";

export default function Index() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        StaffServices.getMyPlannings()
            .then((response) => {
                setLoading(false)
                return setData(response.data.availabilities)
            })
            .catch((error) => {
                setLoading(false)
                return setError(error.toString())
            })
    }, [])

    console.log("Data receive", data);

    return (
        <Authenticated>
            <h1 className="text-center font-bold text-3xl py-3 mb-4"> Mon planning </h1>
            {loading ? (
                <div className="flex min-h-screen justify-center items-center">
                    <Spin/>
                </div>
            ) : (
                <div className="flex justify-center flex-wrap">
                    {data.length <= 0 ? (
                        <h1 className="text-3xl font-bold py-3">Not Data Found for this </h1>
                    ) : (
                        data.map((value) => {
                            const {id, day, debut, fin} = value
                            return (
                                <CalenderCard key={id} day={day} start={debut}
                                              id={id}
                                              end={fin} link={"/dashboard/staff/planning/update/" + day}/>
                            )
                        })
                    )}
                </div>
            )}
        </Authenticated>
    )
}
