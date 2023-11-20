import './confirmForm.css'

export const ConfirmForm = ({handleReady, handleReject}) => {
    return (
        <div id='confirm-container'>
            <button onClick={handleReady}>Готово</button>
            <button onClick={handleReject}>Отменить</button>
        </div>
    )
}