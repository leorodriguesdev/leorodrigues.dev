// services/api.js

import axios from 'axios';

export const fetchEducationData = async () => {
  const response = await axios.get('/api/education');
  return response.data;
};

export const fetchExperienceData = async () => {
  const response = await axios.get('/api/experiences');
  return response.data;
};

export const fetchProjectsData = async () => {
  const response = await axios.get('/api/projects');
  return response.data;
};

export const fetchSkillsData = async () => {
  const response = await axios.get('/api/skills');
  return response.data;
};
