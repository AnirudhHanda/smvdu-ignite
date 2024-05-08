import React from 'react';
import './DashboardStyle.css'
import qnaImage from './dashboard_assets/qna.png'
import {useNavigate} from "react-router-dom";

const QnaCard = () => {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={()=>navigate("/questions")}>
            <div className="card__border1">
                <div className="card__perfil1">
                    <img src={qnaImage} alt="card image" className="card__img1" />
                </div>
            </div>

            <h3 className="card__name1">QnA</h3>
            <span className="card__profession1">Bas Gaal ni Kadni !</span>

            <div className="info1">
                <div className="info__icon1">
                    <i className="ri-information-line"></i>
                </div>

                <div className="info__border1">
                    <div className="info__perfil1">
                        <img src={qnaImage} alt="card image" className="info__img1" />
                    </div>
                </div>

                <div className="info__data1">
                    <h3 className="info__name1">Ask relevant Questions...You will get a reply !</h3>
                    <span className="info__profession1">Replies are by your peers or seniors.</span>
                </div>

                <div className="info__social1">

                        <span className="info__social-icon1">
                            <i className="ri-linkedin-box-line"></i>
                        </span>



                        <span className="info__social-icon1">
                            <i className="ri-dribbble-fill"></i>
                        </span>



                        <span className="info__social-icon1">
                            <i className="ri-github-fill"></i>
                        </span>

                </div>
            </div>
        </div>
    );
};

export default QnaCard;
