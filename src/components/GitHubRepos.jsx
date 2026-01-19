import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';

const GitHubRepos = ({ username = 'your-username' }) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPinnedRepos = async () => {
      try {
        // GitHub GraphQL API for pinned repositories
        const query = `
          query {
            user(login: "${username}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                      name
                      color
                    }
                  }
                }
              }
            }
          }
        `;

        // For now, we'll use a placeholder approach
        // In production, you'd need to set up GitHub API authentication
        setLoading(false);
        setRepos([]);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Only fetch if username is provided and not placeholder
    if (username && username !== 'your-username') {
      fetchPinnedRepos();
    } else {
      setLoading(false);
    }
  }, [username]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        Error loading repositories: {error}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <Github className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400">
          Add your GitHub username to display pinned repositories
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo, index) => (
        <motion.a
          key={repo.name}
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
          className="block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {repo.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {repo.description || 'No description available'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {repo.primaryLanguage && (
                <>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: repo.primaryLanguage.color }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {repo.primaryLanguage.name}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
              <Star className="w-4 h-4" />
              <span className="text-xs">{repo.stargazerCount}</span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default GitHubRepos;

