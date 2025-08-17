import { Link } from "react-router";
import { format } from "date-fns";

const News = ({ notizia }) => {
  const formattedDate = notizia.publishedAt
    ? format(new Date(notizia.publishedAt), "MMM d, yyyy - h:mm a")
    : "";

  return (
    <article className="px-2 sm:px-4">
      {" "}
      {/* Modified padding here */}
      <Link
        to={notizia.url}
        className="flex flex-col md:flex-row gap-3 p-3 sm:p-4 hover:bg-gray-50 active:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-100 hover:border-gray-200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${notizia.title}`}
      >
        {/* Image Container */}
        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={notizia.image || "/news-placeholder.jpg"}
            alt={notizia.title}
            className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.target.src = "/news-placeholder.jpg";
            }}
          />
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1">
          <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 line-clamp-2">
            {notizia.title}
          </h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2 sm:mb-3">
            {notizia.author && (
              <span className="text-xs sm:text-sm md:text-base text-blue-600 font-medium">
                {notizia.author}
              </span>
            )}
            <time
              className="text-2xs sm:text-xs md:text-sm text-gray-500"
              dateTime={notizia.publishedAt}
            >
              {formattedDate}
            </time>
          </div>

          <p className="text-gray-700 text-xs sm:text-sm md:text-base lg:text-lg mb-2 sm:mb-3 line-clamp-2 md:line-clamp-3">
            {notizia.description}
          </p>

          <div className="mt-auto">
            {notizia.source?.name && (
              <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 text-gray-600 text-2xs sm:text-xs rounded-full">
                {notizia.source.name}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default News;
