import '../assets/css/Likes.css';

function Likes(props) {
  return (
    <div className="Likes">
        <p>{props.likes} likes</p>
      {/* entire Note component elements lie here inside Note div */}
    </div>
  );
}

export default Likes;