import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

export default function Security() {
    const navigate = useNavigate();
    const [errormsg, setErrormsg] = useState("");
    const [visible, setVisible] = useState(false);
    const [cpVisible, setCPVisible] = useState(false);
    const [npVisible, setNPVisible] = useState(false);

    var isCorrectCredentials = false;

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountHashedPass, setAccountHashedPass] = useState("");

    const [last_login, setLast_login] = useState("");
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            axios
                .get(`/userProfile?username=${token}`)
                .then((response) => {
                    const data = response?.data?.User[0];
                    setLast_login(data?.last_login);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const middleMan = () => {
        const token = sessionStorage.getItem("token");
        axios.get("/authenticateUser", { params: { username: token, password: password } }).then((data) => {
            isCorrectCredentials = ((data.data === 1) ? true : false);

            if (!isCorrectCredentials) {
                setErrormsg("Please enter your password");
            } else {
                if (password.length === 0) {
                    setErrormsg("Please enter your new password");
                    return;
                }

                if (newPassword.length < 8) {
                    setErrormsg("New password must be at least 8 characters long");
                    return;
                }

                if (newPassword != confirmPassword) {
                    setErrormsg("New Passwords do not match");
                    return;
                }

                handleSave();
                setErrormsg("Works")
            }
        }, [token, password]);

    }

    const handleSave = () => {
        const authToken = sessionStorage.getItem("token");
        setAccountHashedPass(newPassword);
        setAccountHashedPass(password);
        if (authToken) {
            const csrftoken = getCookie("csrftoken");

            axios({
                method: "put",
                url: `/updatePassword?username=${authToken}`,
                headers: {
                    "X-CSRFToken": csrftoken,
                    "Content-Type": "application/json",
                },
                data: {
                    password: newPassword || password,
                },
            })
                .then((response) => {
                    console.log(response.data);

                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const deleteAccount = () => {
        const authToken = sessionStorage.getItem("token");
        if (authToken) {
            const csrftoken = getCookie("csrftoken");
            axios
                .delete(`/deleteProfile?username=${authToken}`, {
                    headers: {
                        "X-CSRFToken": getCookie("csrftoken")
                    }
                })
                .then(response => {
                    console.log(response.data);
                    // Handle success
                })
                .catch(error => {
                    console.error(error);
                    // Handle error
                });
        }
        sessionStorage.removeItem("token");
        console.log("Signed out");
        navigate("/login");
    };



    return (
        <div className="security-container">
            <Col md={2.5}>
                <div className="security-header">Security Settings</div>

                <div style={{ fontSize: '30px', marginTop: '15px' }}>Change Password:</div>
                <div className="input">
                    <input
                        placeholder="Current Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type={visible ? "text" : "password"}
                    ></input>
                </div>
                <div className="input">
                    <input
                        placeholder="New Password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        type={npVisible ? "text" : "password"}
                    ></input>
                </div>
                <div className="input">
                    <input
                        placeholder="Confirm New Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={cpVisible ? "text" : "password"}
                    ></input>
                </div>
                <div>
                    <button onClick={middleMan} className="saveP">
                        Save Changes
                    </button>
                </div>
                <div className="errormsg">{errormsg}</div>
                <div className="lastLogin">Last Login - {last_login}</div>
            </Col >
            <Col style={{ paddingLeft: '100px', paddingTop: '73px' }}>
                <div style={{ fontSize: '30px' }}>Delete Account:</div>
                <div>
                    <button className="delete" onClick={deleteAccount}>
                        Delete
                    </button>
                </div>


            </Col>
        </div >
    )

}