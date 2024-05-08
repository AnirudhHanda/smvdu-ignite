import React from 'react';
import './DashboardStyle.css'
import pyqImage from './dashboard_assets/pyq2.png'
import {useNavigate} from "react-router-dom";

const PyqsCard= () => {
    const navigate = useNavigate();
    return (
        <div className="card" onClick={()=>navigate("/departments/pyqs")}>
            <div className="card__border1">
                <div className="card__perfil1">
                    <img src={pyqImage} alt="card image" className="card__img1" />
                </div>
            </div>

            <h3 className="card__name1">PYQs</h3>
            <span className="card__profession1">If tomorrow, just do this !</span>

            <div className="info1">
                <div className="info__icon1">
                    <i className="ri-information-line1"></i>
                </div>

                <div className="info__border1">
                    <div className="info__perfil1">
                        <img src={pyqImage} alt="card image" className="info__img1" />
                    </div>
                </div>

                <div className="info__data1">
                    <h3 className="info__name1">Take a breath, Someone will upload it !</h3>
                    <span className="info__profession1">PYQs are always hard to find.</span>
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

export default PyqsCard;
