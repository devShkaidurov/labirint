import './confirmForm.css'
import success from '../../../images/success.svg';
import trash from '../../../images/trash.svg';

export const ConfirmFormAlg = ({handleReady, handleReject}) => {
    return (
        <div id='confirm-container-alg'>
            <button onClick={handleReady}>
                <img src={success}></img>
                Готово
            </button>
            <button onClick={handleReject}>
                <img src={trash}></img>
                Отменить
            </button>
        </div>
    )
}