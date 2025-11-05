"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Code2 } from "lucide-react";
import { projectsData } from "@/data/projectsData";

const Projects = () => {
  const projects = projectsData.slice(-3).reverse();

  return (
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl tracking-tight font-audiowide">
              Projetos em <span className="text-primary">Destaque</span>
        </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Alguns dos projetos que desenvolvi recentemente
        </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={`/projects/${project.id}?title=${project.title}`}
                  className="block h-full"
                >
                  <div className="h-full bg-card border border-border rounded-lg overflow-hidden hover:border-primary transition-colors">
                    {/* Project Image/Preview */}
                    <div className="aspect-video relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                      {project.image ? (
                <Image
                  src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Code2 className="text-primary/40" size={48} />
                      )}
                    </div>
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-secondary border border-border rounded text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                </div>
              </div>
                </Link>
              </motion.div>
          ))}
        </div>

          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              Ver Todos os Projetos
              <ArrowRight size={20} />
        </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;