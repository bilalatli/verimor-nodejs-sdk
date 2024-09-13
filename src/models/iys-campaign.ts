/**
 * Interface representing an IYS campaign.
 */
export interface IysCampaign {
  /** Campaign ID. */
  id: number;
  /** Header name. */
  header_name: string;
  /** IYS code. */
  iys_code: number;
  /** IYS brand code. */
  iys_brand_code: number;
  /** Source of the campaign (e.g., "iys", "api"). */
  source: string;
  /** Creation timestamp. */
  created_at: string;
}
