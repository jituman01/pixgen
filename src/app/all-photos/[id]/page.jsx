import { BiCamera, BiDownload, BiHeart, BiTimeFive } from 'react-icons/bi';
import { FaDownload, FaMaximize } from 'react-icons/fa6';
import { MdOutlineDescription } from 'react-icons/md';

const PhotoDetailsPage = async ({ params }) => {
  const { id } = await params;
  
  // Data Fetching
  const res = await fetch('https://pixgen-eta.vercel.app/data.json', {
    next: { revalidate: 3600 } 
  });
  
  const photos = await res.json();
  const photo = photos.find(p => p.id == id);

  if (!photo) {
    return (
      <div className="flex items-center justify-center min-h-screen font-sans text-xl font-bold">
        Photo not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT: Image Display Section */}
          <div className="lg:w-3/5 bg-gray-900 flex items-center justify-center p-4 min-h-[400px]">
            <img
              src={photo.imageUrl}
              alt={photo.title}
              className="max-h-[85vh] w-full object-contain rounded-lg shadow-2xl shadow-black/20"
            />
          </div>

          {/* RIGHT: Information Section */}
          <div className="lg:w-2/5 p-6 md:p-10 flex flex-col justify-between">
            <div>
              {/* Category and Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {photo.category}
                </span>
                <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                  <BiTimeFive size={18} />
                  <span>{new Date(photo.createdAt).toLocaleDateString('en-GB')}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                {photo.title}
              </h1>

              {/* Stats: Likes & Downloads */}
              <div className="flex gap-8 mb-8 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-50 rounded-lg text-pink-500">
                    <BiHeart size={22} fill="currentColor" />
                  </div>
                  <span className="font-bold text-gray-700">{photo.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
                    <BiDownload size={22} />
                  </div>
                  <span className="font-bold text-gray-700">{photo.downloads}</span>
                </div>
              </div>

              {/* Prompt Section */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                  <MdOutlineDescription size={18} /> AI Generation Prompt
                </h3>
                <div className="p-5 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-600 italic leading-relaxed">
                    "{photo.prompt}"
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 shadow-sm">
                  <BiCamera size={24} className="text-indigo-400" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Model</p>
                    <p className="font-semibold text-gray-800">{photo.model}</p>
                  </div>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center gap-3 shadow-sm">
                  <FaMaximize size={20} className="text-indigo-400" />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">Resolution</p>
                    <p className="font-semibold text-gray-800">{photo.resolution}</p>
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="mb-10">
                <div className="flex flex-wrap gap-2">
                  {photo.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-medium hover:bg-indigo-600 hover:text-white transition-all duration-300 cursor-default"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
               <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-indigo-100 active:scale-95">
                <FaDownload size={20} /> Download Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;