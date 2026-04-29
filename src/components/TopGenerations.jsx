import PhotoCard from "./PhotoCard";

const TopGenerations = async () => {
  const res = await fetch('https://pixgen-snowy.vercel.app/data.json');
  const photos = await res.json();
  // console.log(photos);
  const topPhotos = photos.slice(0, 8);
  // console.log(topPhotos);
  
  

  return (
    <div>
      <h1 className="text-2xl font-bold ">Top Generation</h1>

      <div className="grid grid-cols-4 gap-4">
        {
          topPhotos.map(photo => <div key={photo.id}>
            <PhotoCard photo={photo}></PhotoCard>
          </div>)
        }
      </div>
    </div>
  );
};

export default TopGenerations;