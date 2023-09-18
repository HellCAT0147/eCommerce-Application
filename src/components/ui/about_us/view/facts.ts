import { Blocks, Elem, Mode, Titles } from '../../../models/builder';
import Builder from '../../builder/html-builder';

export default function renderFacts(): HTMLElement {
  const facts: HTMLElement = new Builder('section', '', Blocks.about, Elem.facts, '').element();
  const factsTitle: HTMLHeadingElement = new Builder('', '', Blocks.facts, Elem.title, '').h(2);
  const factPr: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.pr).p();
  const factPrAmount: HTMLElement = new Builder('span', '', Blocks.facts, Elem.amount, '').element();
  const factCommits: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.comm).p();
  const factCommitsAmount: HTMLElement = new Builder('span', '', Blocks.facts, Elem.amount, '').element();
  const factLines: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.lines).p();
  const factLinesAmount: HTMLElement = new Builder('span', '', Blocks.facts, Elem.amount, '').element();
  const factBranches: HTMLParagraphElement = new Builder('', '', Blocks.facts, Elem.fact, Mode.branches).p();
  const factBranchesAmount: HTMLElement = new Builder('span', '', Blocks.facts, Elem.amount, '').element();

  factsTitle.textContent = Titles.FACTS;
  factPr.textContent = Titles.FACTS_PR;
  factPrAmount.textContent = Titles.PR_AMOUNT;
  factCommits.textContent = Titles.FACTS_COMM;
  factCommitsAmount.textContent = Titles.COMM_AMOUNT;
  factLines.textContent = Titles.FACTS_LINES;
  factLinesAmount.textContent = Titles.LINES_AMOUNT;
  factBranches.textContent = Titles.FACTS_BRANCHES;
  factBranchesAmount.textContent = Titles.BRANCHES_AMOUNT;

  factPr.appendChild(factPrAmount);
  factCommits.appendChild(factCommitsAmount);
  factLines.appendChild(factLinesAmount);
  factBranches.appendChild(factBranchesAmount);
  facts.append(factsTitle, factPr, factCommits, factBranches, factLines);

  return facts;
}
