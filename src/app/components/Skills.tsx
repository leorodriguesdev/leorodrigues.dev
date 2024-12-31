// components/Skills.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaReact, FaNodeJs, FaJsSquare } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiExpo } from "react-icons/si";

// Lista de skills com descrição
const skills = [
  {
    icon: <FaReact className="text-blue-500" />,
    name: "React",
    percentage: 96,
    description:
      "Tecnologia para criar sites e sistemas interativos com alto desempenho, garantindo uma ótima experiência para os usuários.",
  },
  {
    icon: <SiNextdotjs className="text-black dark:text-white" />,
    name: "Next.js",
    percentage: 89,
    description:
      "Expande o React para gerar páginas rápidas e seguras. Ideal para sites de negócios que precisam de boa performance e SEO.",
  },
  {
    icon: <FaReact className="text-blue-700" />,
    name: "React Native",
    percentage: 97,
    description:
      "Permite criar aplicativos móveis (Android/iOS) usando a mesma base do React, agilizando o lançamento de apps para o seu negócio.",
  },
  {
    icon: <SiExpo className="text-black dark:text-white" />,
    name: "Expo",
    percentage: 90,
    description:
      "Facilita o desenvolvimento de aplicativos sem configurações complicadas, acelerando a publicação e as atualizações dos apps.",
  },
  {
    icon: <FaJsSquare className="text-yellow-500" />,
    name: "JavaScript",
    percentage: 95,
    description:
      "Linguagem fundamental que garante a parte interativa do site ou sistema, tornando-o mais dinâmico e atraente.",
  },
  {
    icon: <FaNodeJs className="text-green-600" />,
    name: "Node.js",
    percentage: 81,
    description:
      "Permite criar servidores e APIs robustos para atender múltiplos usuários simultaneamente, sem lentidão ou travamentos.",
  },
  {
    icon: <SiTypescript className="text-blue-700" />,
    name: "TypeScript",
    percentage: 85,
    description:
      "Versão mais organizada do JavaScript, ajudando a evitar erros e manter seu projeto estável à medida que cresce.",
  },
  {
    icon: <SiTailwindcss className="text-blue-400" />,
    name: "Tailwind CSS",
    percentage: 87,
    description:
      "Ferramenta de design que agiliza a criação de layouts atraentes e responsivos, adequados a qualquer tamanho de tela.",
  },
];


const Skills = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // No MOBILE: guarda índices de cards que cruzaram a faixa de 50px
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  // Verifica se é mobile (< 768px)
  const [isMobile, setIsMobile] = useState(false);

  // No MOBILE: guarda o índice do card focado para exibir toast
  const [focusedSkillIndex, setFocusedSkillIndex] = useState<number | null>(null);

  // No DESKTOP: guarda o índice do card que está em hover para exibir toast
  const [hoveredSkillIndex, setHoveredSkillIndex] = useState<number | null>(null);

  // 1) Detecta se é mobile (width < 768)
  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  // 2) IntersectionObserver para efeito "hover automático" no MOBILE
  useEffect(() => {
    if (!cardRefs.current.length) return;

    const viewportHeight = window.innerHeight;
    const halfHeight = viewportHeight / 2;
    const halfStrip = 30; // total de 50px
    const marginValue = halfHeight - halfStrip;
    const rootMarginString = `-${marginValue}px 0px -${marginValue}px 0px`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            // MOBILE => "hover automático"
            if (isMobile) {
              setActiveIndices((prev) => {
                if (!prev.includes(index)) return [...prev, index];
                return prev;
              });
              setFocusedSkillIndex(index); // exibe toast no mobile
            }
          } else {
            // sai do centro
            if (isMobile) {
              setActiveIndices((prev) => prev.filter((i) => i !== index));
              if (focusedSkillIndex === index) {
                setFocusedSkillIndex(null);
              }
            }
          }
        });
      },
      {
        root: null,
        rootMargin: rootMarginString,
        threshold: 0,
      }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isMobile, focusedSkillIndex]);

  // Função auxiliar: retorna qual índice está "em foco" no desktop vs mobile
  // - No mobile => `focusedSkillIndex` (IntersectionObserver)
  // - No desktop => `hoveredSkillIndex` (hover do mouse)
  const getCurrentSkillIndexForToast = () => {
    if (isMobile) {
      return focusedSkillIndex;
    }
    return hoveredSkillIndex;
  };

  const skillIndexForToast = getCurrentSkillIndexForToast();

  return (
    <section
      id="skills"
      className="
        w-full
        flex flex-col justify-center items-center
        bg-[var(--bg-color)] text-[var(--text-color)]
        py-20 px-4 overflow-x-hidden
        min-h-[100vh]
      "
    >
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-[var(--primary-color)] font-audiowide">
          Habilidades e Tecnologias
        </h2>
        <p className="mb-16 text-xl max-w-3xl mx-auto">
          Tecnologias e ferramentas que utilizo para transformar ideias em projetos de alta qualidade.
        </p>

        <div
          className="
            grid grid-cols-1 px-10 md:px-0 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4
            gap-8 md:gap-12 max-w-6xl mx-auto
          "
        >
          {skills.map((skill, index) => {
            // Se for mobile e o índice estiver ativo => "hover"
            const isActiveMobile = isMobile && activeIndices.includes(index);

            return (
              <div
                key={index}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-index={index}
                // Se NÃO for mobile, no onMouseEnter => hoveredSkillIndex = index
                // onMouseLeave => hoveredSkillIndex = null
                onMouseEnter={() => {
                  if (!isMobile) setHoveredSkillIndex(index);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setHoveredSkillIndex(null);
                }}
                className={`
                  relative min-w-[255px] min-h-[176px]
                  flex flex-col items-center space-y-5
                  bg-[var(--bg-card)] p-8 rounded-2xl shadow-xl
                  transition-transform duration-500
                  group
                  hover:scale-105 hover:rotate-2 hover:shadow-[var(--primary-color)]
                  ${
                    isActiveMobile
                      ? "scale-105 rotate-2 shadow-[var(--primary-color)]"
                      : ""
                  }
                `}
              >
                {/* Ícone */}
                <div
                  className={`
                    text-6xl transition-transform duration-500
                    group-hover:scale-110 group-hover:text-9xl
                    md:group-hover:text-8xl lg:group-hover:text-9xl
                    group-hover:rotate-6 group-hover:absolute
                    group-hover:top-5 md:group-hover:top-8
                    group-hover:left-34 lg:group-hover:left-20
                    group-hover:-translate-x-1/2

                    ${
                      isActiveMobile
                        ? "scale-110 text-9xl rotate-6 absolute top-5 md:top-8 left-34 lg:left-20 -translate-x-1/2"
                        : ""
                    }
                  `}
                >
                  {skill.icon}
                </div>

                {/* Nome da skill */}
                <h3
                  className={`
                    text-2xl font-semibold transition-opacity duration-500 
                    opacity-80 group-hover:opacity-100 group-hover:hidden
                    ${isActiveMobile ? "hidden" : ""}
                  `}
                >
                  {skill.name}
                </h3>

                {/* Barra de Progresso e Porcentagem */}
                <div
                  className={`
                    absolute top-4 lg:top-6 -right-16 md:-right-16 -translate-x-3/4 
                    flex flex-col opacity-0 group-hover:opacity-100
                    transition-opacity duration-500
                    ${isActiveMobile ? "opacity-100" : ""}
                  `}
                >
                  <div className="relative w-24 h-24 flex items-center justify-center rounded-full bg-black bg-opacity-70">
                    <span className="text-2xl font-bold text-white z-10">
                      {skill.percentage}%
                    </span>
                    <svg className="absolute top-0 left-0 w-full h-full">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="38"
                        stroke="white"
                        strokeWidth="6"
                        fill="transparent"
                        className="opacity-20"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="38"
                        stroke="var(--primary-color)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray="238"
                        strokeDashoffset="238"
                        style={{
                          strokeDashoffset: `${238 - (238 * skill.percentage) / 100}`,
                          transition: "stroke-dashoffset 1s ease-in-out",
                        }}
                      />
                    </svg>
                  </div>
                  <p className="font-audiowide text-xs text-[var(--text-color)] mt-2">
                    Expertise
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOAST: 
          - Mobile => exibe se focusedSkillIndex != null
          - Desktop => exibe se hoveredSkillIndex != null
      */}
      {skillIndexForToast !== null && (
        <div
          className="
            fixed bottom-8 left-1/2 -translate-x-1/2
            bg-black bg-opacity-90 text-white text-sm p-4
            rounded-md w-[300px] max-w-[90%] z-50 text-center
            shadow-lg
          "
        >
          <strong className="block mb-2">
            {skills[skillIndexForToast].name}
          </strong>
          {skills[skillIndexForToast].description}
        </div>
      )}
    </section>
  );
};

export default Skills;
