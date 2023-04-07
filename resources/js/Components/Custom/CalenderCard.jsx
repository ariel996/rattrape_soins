import {Link} from "react-router-dom";

export default function CalenderCard({day, start, end, link, id}) {
    return (
        <Link className="min-w-32 bg-white min-h-48 m-3 mb-4 font-medium" state={id} to={link}>
            <div className="w-50 flex-none rounded-t lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
                <div className="block px-3 rounded-t overflow-hidden  text-center ">
                    <div className="bg-green-400 text-white py-1">
                    </div>
                    <div className="pt-1 border-l border-r border-white bg-white">
                              <span className="text-3xl font-bold leading-tight">
                                {day}
                              </span>
                    </div>
                    <div
                        className="border-l border-r border-b rounded-b-lg text-center border-white bg-white -pt-2 -mb-1">
                              <span className="text-sm">
                                Disponible de :
                              </span>
                    </div>
                    <div className="pb-2 border-l border-r border-b rounded-b-lg text-center border-white bg-white">
                              <span className="text-xs leading-normal">
                                {start} à {end}
                              </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
