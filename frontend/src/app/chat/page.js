import "@fortawesome/fontawesome-svg-core/styles.css";
import Sidebar from "@/components/sidebar";
import ChatWindow from "@/components/chatWindow";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;


export default function Chat() {
    
    return (
        <div style={{display:"flex"}} >
            <Sidebar/>
            <ChatWindow/>
        </div>
    );
}
