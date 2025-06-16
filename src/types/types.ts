export interface Superhero {
  _id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export type SuperheroFormData = {
  nickname: string;
  real_name: string;
  origin_description: string;
  catch_phrase: string;
  superpowers: string;
};

