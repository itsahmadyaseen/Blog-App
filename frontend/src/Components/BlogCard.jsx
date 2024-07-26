/* eslint-disable react/prop-types */

const BlogCard = ({title, thumbnail }) => {
  

  return (
    
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{title}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
