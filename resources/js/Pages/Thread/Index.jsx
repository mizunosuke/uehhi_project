import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


export default function Thread (props) {

    //初回レンダリング時に取得したuser_idを元に
    // useEffect(() => {
    //     route("thread.index");
    // },[])

    console.log(props);

    //propsでport_idに紐づく投稿を受け取り表示
    return (
        <div>
            {props.tweet.map((tw) => (
                <div>
                    <p>{tw.id}</p>
                    <p>{tw.text}</p>
                </div>
            ))}
        </div>
    )
}