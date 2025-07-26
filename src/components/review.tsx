
import MarkdownPreview from '@uiw/react-markdown-preview';
import Loader from './Loader';

const Review = ({review,loader}:{review:string,loader:boolean})=>{
    return <div className="h-full w-6/12 relative">
        { loader ? <Loader /> :  <MarkdownPreview source={review} style={{ padding: 16, fontSize:'14px' ,height:'100vh',color:"white", backgroundColor:'#1b1b1dff'}} />}
    </div>
}

export default Review;