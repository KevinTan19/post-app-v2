const PostCard = (props) => {
  const { data } = props;
  return (
    <div className="p-4 space-y-2 rounded-lg hover:bg-black/10">
      <p className="text-xl font-bold">{data.title}</p>
      <p className="text-sm">{data.body}</p>
    </div>
  );
};

export default PostCard;
