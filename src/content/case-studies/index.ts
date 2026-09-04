import * as pdfgini from "./pdfgini";
import { CaseStudyModule } from "@/lib/case-studies/types";

const caseStudiesMap: Record<string, CaseStudyModule> = {
  [pdfgini.caseStudy.slug]: pdfgini as unknown as CaseStudyModule,
};

export default caseStudiesMap;

