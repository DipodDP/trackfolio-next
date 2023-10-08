import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const portfolioLabels = [
  {
    value: "share",
    label: "Share",
  },
  {
    value: "bond",
    label: "Bond",
  },
  {
    value: "currency",
    label: "Currency",
  },
]

export const profits = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
// export const portfolio_labels = [
//   {
//     value: "ticker",
//     label: "Ticker",
//   },
//   {
//     value: "title",
//     label: "Title",
//   },
//   {
//     value: "price",
//     label: "Price",
//   },
//   {
//     value: "amount",
//     label: "Amount",
//   },
//   {
//     value: "total",
//     label: "Total",
//   },
//   {
//     value: "proportion",
//     label: "Proportion",
//   },
//   {
//     value: "profit",
//     label: "Profit",
//   },
//   {
//     value: "progress",
//     label: "Progress",
//   },
// ]
//
export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]
