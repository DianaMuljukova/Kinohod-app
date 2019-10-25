import React from 'react';

const Popup = props => {

    const popupAnswerOk = () => {
        props.getAnswer('ok');
    };

    const popupAnswerCancel = () => {
        props.getAnswer('cancel');
    };

    return (
        <div className="popup">
            <p>
                Для того чтобы показать ближайшие к Вам кинотеатры, нам необходимо знать где Вы находитесь. Для этого нам нужно разрешение на определение Вашего местоположения
            </p>
            <div className="popup_answers">
                <p className="popup_answer" onClick={popupAnswerCancel}>Отмена</p>
                <p className="popup_answer" onClick={popupAnswerOk}>Ок</p>
            </div>
        </div>
    )
};

export default Popup;