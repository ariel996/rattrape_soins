import React from 'react';

export default function Table({rows= [], children}) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="flex justify-end py-3 pl-2">
                    <div className="relative max-w-xs">
                        <label htmlFor="hs-table-search" className="sr-only">
                            Search
                        </label>
                        <input
                            type="text"
                            name="hs-table-search"
                            id="hs-table-search"
                            className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                            placeholder="Search..."
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                            <svg
                                className="h-3.5 w-3.5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="p-1.5 w-full inline-block align-middle">
                    <div className="overflow-hidden border rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                {/*<th scope="col" className="py-3 pl-4">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="checkbox"
                                            className="sr-only"
                                        >
                                            Checkbox
                                        </label>
                                    </div>
                                </th>*/}
                                {rows.map((value, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            {value.name}
                                        </th>
                                    )
                                )}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
