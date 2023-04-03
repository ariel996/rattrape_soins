export default function Message({error, message}) {
    return (
        <div className={'rounded p-3 m-2 w-1/2 text-white text-center transition' + (error ? ' bg-red-600 ' :' bg-green-600 ')}>
            {message}
        </div>
    )
}
