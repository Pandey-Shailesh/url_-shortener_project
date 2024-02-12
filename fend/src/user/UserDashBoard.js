import React, { useState } from "react";
import Base from "../core/Base";
import axios from 'axios';
import {
    Input,
    Button,
    Flex,
    useClipboard,

} from "@chakra-ui/react";

const UserDashBoard = () => {

    const [values, setValues] = useState({
        longUrl: "",
        urlCode: "",
    });

    const { longUrl, urlCode } = values;
    const [url, setUrl] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { hasCopied, onCopy } = useClipboard(url);
    const clientBaseUrl = window.location.href;


    const handleChange = (longUrl) => (event) => {
        setValues({ ...values, error: false, [longUrl]: event.target.value });
    };
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setValues({ ...values, [id]: value });
        setIsError(false);
    };
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };
    const handleSubmit = () => {
        if (!values.longUrl) {
            setIsError(true);
            setUrl("Please add a URL");
            return;
        }
        setIsloading(true);
        axios.post('/api', values).then(res => {
            if (res.status) {
                let data = res.data;
                let createUrl = clientBaseUrl + data.urlCode;
                setUrl(createUrl);
            }
            setIsloading(false);
        }).catch(error => {
            let errorMsg = error.response.data.error;
            setUrl(errorMsg);
            console.log("error", errorMsg);
            setIsloading(false);
        });
    };




    const userPage = () => {
        return (
            <div>
                <h1>Please, Paste Link in below Input Box.</h1>
                <div className="">
                    <input id="longUrl" type="url"
                        value={values.longUrl}
                        placeholder="Paste here your long URL"
                        className="form-control"
                        onChange={handleInputChange}
                        onKeyDown={handleEnter} />

                    <br />
                    <button type="submit" onClick={handleSubmit} isLoading={isLoading} loadingText='Submitting' className="btn btn-success btn-lg btn-block">
                        Submit
                    </button>

                    {url && <Flex mb={2}>
                        <Input value={url} isReadOnly placeholder="Short Url" />
                        <Button onClick={onCopy}>
                            {hasCopied ? "Copied" : "Copy"}
                        </Button>
                    </Flex>}

                </div>

            </div>
        )
    }


    return (
        <Base title="Welcome User !"
            description="This is free tool to shorten URLs and generate short.">

            {userPage()}
        </Base>
    );
};
export default UserDashBoard;