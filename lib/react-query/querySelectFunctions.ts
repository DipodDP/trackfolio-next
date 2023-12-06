import { IStructureResponse } from "../models/portfolio.api.model"

export function selectStructure( structure: IStructureResponse) {
      let portfolioParts = [
        {
          type: "Low risk part",
          sum: structure.current_structure.low_risk_part.low_risk_total_amount,
          plan_sum: structure.plan_structure.low_risk_part.low_risk_total_amount,
          proportion: structure.current_structure.low_risk_part.low_risk_total_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.low_risk_total_proportion,
          format: true
        },
        {
          type: "Gov. bonds",
          sum: structure.current_structure.low_risk_part.gov_bonds_amount,
          plan_sum: structure.plan_structure.low_risk_part.gov_bonds_amount,
          proportion: structure.current_structure.low_risk_part.gov_bonds_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.gov_bonds_proportion,
          format: false
        },
        {
          type: "Corp. bonds",
          sum: structure.current_structure.low_risk_part.corp_bonds_amount,
          plan_sum: structure.plan_structure.low_risk_part.corp_bonds_amount,
          proportion: structure.current_structure.low_risk_part.corp_bonds_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.corp_bonds_proportion,
          format: false
        },
        {
          type: "High risk part",
          sum: structure.current_structure.high_risk_part.high_risk_total_amount,
          plan_sum: structure.plan_structure.high_risk_part.high_risk_total_amount,
          proportion: structure.current_structure.high_risk_part.high_risk_total_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.high_risk_total_proportion,
          format: true
        },
        {
          type: "ETF",
          sum: structure.current_structure.high_risk_part.etf_amount,
          plan_sum: structure.plan_structure.high_risk_part.etf_amount,
          proportion: structure.current_structure.high_risk_part.etf_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.etf_proportion,
          format: false
        },
        {
          type: "Shares",
          sum: structure.current_structure.high_risk_part.shares_amount,
          plan_sum: structure.plan_structure.high_risk_part.shares_amount,
          proportion: structure.current_structure.high_risk_part.shares_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.shares_proportion,
          format: false
        },
      ]
      portfolioParts = portfolioParts.map(item => {
        return {
          ...item,
          disbalance: item.proportion !== null ? item.plan_proportion - item.proportion : null
        }
      })

      return portfolioParts
    }
