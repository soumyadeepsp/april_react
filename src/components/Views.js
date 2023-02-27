import '../assets/css/Views.css';

function Views(props) {
  return (
    <div className="Views">
        <p>{props.views} views</p>
      {/* entire Note component elements lie here inside Note div */}
    </div>
  );
}

export default Views;