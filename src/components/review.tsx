
import MarkdownPreview from '@uiw/react-markdown-preview';
import Loader from './Loader';

const Review = ({review,loader}:{review:string,loader:boolean})=>{
    return <div className="h-full w-6/12 relative">
        { loader ? <Loader /> :  <div className="markdown-container"><MarkdownPreview source={review} /></div>
           }
    </div>
}

export default Review;