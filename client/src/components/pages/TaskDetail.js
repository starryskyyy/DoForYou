import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../Button";
import Footer from "../Footer";
import ModalInterest from "../modals/ModalInterest";
import Navbar from "../Navbar";
import "./TaskDetail.css";
import ModalReviewCustomer from "../modals/ModalReviewCustomer";
import ModalReviewPerformer from "../modals/ModalReviewPerformer";

function TaskDetail() {
    const params = useParams();
    
    const [show, setShow] = useState(false);
    const [task, setTask] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/tasks/${params.taskId}`)
            .then(data => {
                setTask(data.data.task);
            })
    }, []);
    return (
        <>
            <div id="container">
                <Navbar />

                <div className="task-detail">
                    <div className="task-detail-container">
                        <div className="task-detail-wrapper">
                            <div className="task-detail-content">
                                <div className="task-detail-content-main">
                                    <div className="task-detail-title">
                                        {task.title}
                                    </div>
                                    <div className="task-detail-main-bottom">
                                        <div className="task-detail-written-date">
                                            <div className="written">
                                                Written
                                            </div>
                                            <div className="written-date">
                                                {
                                                    new Date(task.updatedAt)
                                                        .toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        })
                                                }
                                            </div>
                                        </div>
                                        {/* <div className="task-detail-views">
                                                <div className="views-number">
                                                    32
                                                </div>
                                                <div className="views">views</div>
                                            </div> */}
                                    </div>
                                </div>
                                <div className="task-detail-content-body">
                                    <div className="task-detail-content-body-address">
                                        <div className="task-detail-content-body-key">
                                            Address
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            {task.remote
                                                ?
                                                "Can be done remotely"
                                                :
                                                `${task.location &&
                                                task.location.address}`
                                            }
                                        </div>
                                    </div>
                                    <div className="task-detail-content-body-start">
                                        <div className="task-detail-content-body-key">
                                            Start date
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            {
                                                new Date(task.startDate)
                                                    .toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric"
                                                    })
                                            }                                            </div>
                                    </div>
                                    <div className="task-detail-content-body-end">
                                        <div className="task-detail-content-body-key">
                                            End date
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            {
                                                new Date(task.endDate)
                                                    .toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric"
                                                    })
                                            }                                            </div>
                                    </div>
                                    <hr className="task-detail-horizontal-line" />
                                    <div className="task-detail-content-body-budget">
                                        <div className="task-detail-content-body-key">
                                            Budget
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            ${task.budget}
                                        </div>
                                    </div>
                                    <div className="task-detail-content-body-payment">
                                        <div className="task-detail-content-body-key">
                                            How to pay
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            by {task.paymentMethod}
                                        </div>
                                    </div>
                                    <hr className="task-detail-horizontal-line" />
                                    <div className="task-detail-content-body-desc">
                                        <div className="task-detail-content-body-key">
                                            Details
                                        </div>
                                        <div className="task-detail-content-body-value">
                                            {task.details}
                                        </div>
                                    </div>
                                    <div className="task-detail-btn-interest">
                                        <Button
                                            buttonStyle="btn--primary-yellow"
                                            buttonSize="btn--large-bold"
                                            buttonRadius="btn--half-rounded"
                                            type="submit"
                                            onClick={() => setShow(true)}
                                        >
                                            I'M INTERESTED
                                        </Button>
                                        {/* Modal for Showing interest */}
                                        {/*
                                        <ModalInterest
                                            onClose={() => setShow(false)}
                                            show={show}
                                        />
                                        */}
                                        {/* Testing modal for Reviewing customer */}
                                        {/*
                                        <ModalReviewCustomer
                                            onClose={() => setShow(false)}
                                            show={show}
                                        />
                                        */}

                                        {/* Testing modal for Reviewing Performer */}

                                        <ModalReviewPerformer
                                            onClose={() => setShow(false)}
                                            show={show}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="task-detail-user-box">
                                <div className="task-detail-user-title">
                                    Customer Information
                                </div>
                                <div className="task-detail-user-image">
                                    <img src="images/profile/m4.jpg" alt="" />
                                </div>
                                <div className="task-detail-user-name">
                                    Michael D.
                                </div>
                                <div className="task-detail-user-reviews">
                                    Reviews:
                                    <i className="fa-solid fa-thumbs-up task-detail-thumbs-up"></i>
                                    <div className="task-detail-user-reviews-number">
                                        21
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}

export default TaskDetail;
