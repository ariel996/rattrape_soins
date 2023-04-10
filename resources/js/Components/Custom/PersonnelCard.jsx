import {Link} from "react-router-dom";

export default function PersonnelCard({name, id, note}) {
    return (
        <div className="w-1/4 bg-white min-h-48 m-3 mb-5 font-medium">
            <div className="flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                <div className="block p-3 rounded-t overflow-hidden text-center ">
                    <div className="h-20 w-full flex justify-center items-center my-3">
                        <img className="rounded-full w-20" src="/img/user.png" alt=""/>
                    </div>
                    <div className="bg-green-400 text-white py-1">
                        {note}
                    </div>
                    <div className="py-3 bg-white">
                              <span className="text-xl font-bold leading-tight">
                                {name}
                              </span>
                    </div>
                   {/* <div
                        className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                              <span className="text-sm">
                                {surname}
                              </span>
                    </div>*/}
                    <div className="pb-2 text-center">
                        <Link state={id}
                              to="/dashboard/patient/personnel/book-appointment"
                              className="border btn px-3 rounded-lg py-2 "
                        >
                            <i className="fa fa-plus-circle mr-2"/>
                            Book an appointment
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
