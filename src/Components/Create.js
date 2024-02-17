import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Create = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [existingData, setExistingData] = useState([]);
    const history = useNavigate();

    useEffect(() => {
        // Fetch existing data when the component mounts
        axios
            .get("https://65d0ad98ab7beba3d5e384ba.mockapi.io/cloud")
            .then((response) => {
                setExistingData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching existing data:', error);
            });
    }, []);

    const validateForm = () => {
        let isValid = true;

        if (name.trim() === "") {
            setNameError("Please enter your name");
            isValid = false;
        } else {
            setNameError("");
        }

        if (email.trim() === "") {
            setEmailError("Please enter your email");
            isValid = false;
        } else {
            setEmailError("");
        }

        // Check for duplicate data
        if (
            existingData.some(
                (item) => item.name === name && item.email === email
            )
        ) {
            setNameError("Duplicate entry: Name and email already exist");
            setEmailError("Duplicate entry: Name and email already exist");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios
            .post("https://65d0ad98ab7beba3d5e384ba.mockapi.io/cloud", {
                name: name,
                email: email,
            })
            .then(() => {
                // After successful submission, update the existing data
                setExistingData([...existingData, { name, email }]);
                history("/read");
            })
            .catch((error) => {
                console.error("Error submitting data:", error);
            });
    };

    return (
        <>
            <div className="d-flex justify-content-between m-2">
                <h2>Create</h2>
                <Link to="/read">
                    <button className="btn btn-dark">Show Data</button>
                </Link>
            </div>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                        <div className="text-danger">{nameError}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {emailError && (
                        <div className="text-danger">{emailError}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default Create;

