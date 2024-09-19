import Button from "@/components/commons/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: React.FC = () => {

  const router = useRouter()

  return (
    <div className="bg-[#171D22] text-white">
      {/* Hero Section */}
      <section className="h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://themebeyond.com/html/movflx/img/bg/breadcrumb_bg.jpg")' }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Discover Your Next Favorite <span className="text-[#E2D609]">Movie</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">
            Explore the latest blockbuster movies, critically acclaimed films, and your personal favorites – all in one place.
          </p>
          <Button title="Browse Movies" action={() => router.push("/movies", undefined, { shallow: false})} />
        </div>
      </section>

      {/* Featured Movies Section */}
      <section className="py-16 px-8 md:px-44">
        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-12">Featured Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["movie1.jpg", "movie2.jpg", "movie3.jpg"].map((movie, index) => (
            <div key={index} className="relative">
              <img
                src={`/images/${movie}`}
                alt={`Featured movie ${index + 1}`}
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold">Movie Title {index + 1}</h3>
                <p className="text-gray-300 mt-2">An amazing description about this movie goes here.</p>
                <Link href="/movies" className="text-[#E2D609] font-semibold mt-4">
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-8 md:px-44 bg-[#121018] text-center">
        <h2 className="text-3xl md:text-5xl font-semibold mb-8">Join CineSeek Now!</h2>
        <p className="text-lg md:text-2xl mb-12">
          Sign up today to get access to the latest movies, exclusive content, and personalized movie recommendations.
        </p>
        <Button title="Get Started"/>
      </section>
    </div>
  )
}

export default Home;