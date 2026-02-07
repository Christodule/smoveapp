import { motion } from 'motion/react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getFeaturedProjects } from '../data/projects';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function ProjectsSection() {
  const featuredProjects = getFeaturedProjects(6);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project, index) => (
        <motion.article
          key={project.id}
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          onClick={() => {
            window.location.hash = `project-${project.id}`;
          }}
        >
          <motion.div
            className="bg-white rounded-[24px] overflow-hidden shadow-lg h-full flex flex-col"
            whileHover={{
              y: -15,
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Image with 3D effect */}
            <div className="relative aspect-video overflow-hidden">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <ImageWithFallback
                  src=""
                  alt={project.title}
                  query={project.mainImage}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <motion.div
                    className="flex items-center gap-2 text-white"
                    initial={{ x: -20, opacity: 0 }}
                    whileHover={{ x: 0, opacity: 1 }}
                  >
                    <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[16px]">
                      Voir le projet
                    </span>
                    <ExternalLink size={16} />
                  </motion.div>
                </div>
              </div>

              {/* Category Badge */}
              <motion.div
                className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
              >
                <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[12px] text-[#00b3e8]">
                  {project.category}
                </span>
              </motion.div>

              {/* Year Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-[#34c759] px-3 py-1 rounded-full"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4, type: 'spring' }}
              >
                <span className="font-['Abhaya_Libre:Bold',sans-serif] text-[12px] text-white">
                  {project.year}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
              {/* Client */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#00b3e8]" />
                <span className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#9ba1a4]">
                  {project.client}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-['Abhaya_Libre:Bold',sans-serif] text-[24px] text-[#273a41] mb-3 line-clamp-2 group-hover:text-[#00b3e8] transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="font-['Abhaya_Libre:Regular',sans-serif] text-[14px] text-[#38484e] mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-[#f5f9fa] text-[#38484e] px-2 py-1 rounded font-['Abhaya_Libre:Regular',sans-serif] text-[12px]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="bg-[#f5f9fa] text-[#9ba1a4] px-2 py-1 rounded font-['Abhaya_Libre:Regular',sans-serif] text-[12px]">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-2 text-[#00b3e8] font-['Abhaya_Libre:Bold',sans-serif] text-[14px] pt-4 border-t border-[#eef3f5]"
                whileHover={{ x: 5 }}
              >
                Découvrir le projet
                <ArrowRight size={16} />
              </motion.div>
            </div>
          </motion.div>
        </motion.article>
      ))}
    </div>
  );
}
