import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type RangeCategory, RANKS_DISPLAY } from "@/data/range-presets";

interface RangeMatrixProps {
  ranges: Record<string, RangeCategory>;
  title?: string;
  showLegend?: boolean;
}

const categoryColors: Record<RangeCategory, string> = {
  raise: "bg-green-500 hover:bg-green-600",
  call: "bg-yellow-500 hover:bg-yellow-600", 
  fold: "bg-muted/30 hover:bg-muted/50"
};

const categoryLabels: Record<RangeCategory, string> = {
  raise: "Raise/Open",
  call: "Call/Flat",
  fold: "Fold"
};

function getHandKey(row: number, col: number): string {
  const rank1 = RANKS_DISPLAY[row];
  const rank2 = RANKS_DISPLAY[col];
  
  if (row === col) {
    return `${rank1}${rank2}`;
  } else if (row < col) {
    return `${rank1}${rank2}s`;
  } else {
    return `${rank2}${rank1}o`;
  }
}

function getHandLabel(row: number, col: number): string {
  const hand = getHandKey(row, col);
  if (row === col) return hand;
  return row < col ? `${hand} (suited)` : `${hand} (offsuit)`;
}

export function RangeMatrix({ ranges, title, showLegend = true }: RangeMatrixProps) {
  const stats = {
    raise: Object.values(ranges).filter(v => v === "raise").length,
    call: Object.values(ranges).filter(v => v === "call").length,
    fold: Object.values(ranges).filter(v => v === "fold").length
  };
  
  const totalHands = 169;
  const playablePercent = Math.round(((stats.raise + stats.call) / totalHands) * 100);

  return (
    <Card data-testid="card-range-matrix">
      {title && (
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="text-base">{title}</CardTitle>
            <Badge variant="secondary">{playablePercent}% of hands</Badge>
          </div>
        </CardHeader>
      )}
      <CardContent className={title ? "" : "pt-4"}>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-fit">
            <div className="flex">
              <div className="w-6 h-6" />
              {RANKS_DISPLAY.map((rank, i) => (
                <div 
                  key={`col-${i}`} 
                  className="w-6 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground"
                >
                  {rank}
                </div>
              ))}
            </div>
            
            {RANKS_DISPLAY.map((rowRank, row) => (
              <div key={`row-${row}`} className="flex">
                <div className="w-6 h-6 flex items-center justify-center text-xs font-medium text-muted-foreground">
                  {rowRank}
                </div>
                {RANKS_DISPLAY.map((_, col) => {
                  const handKey = getHandKey(row, col);
                  const category = ranges[handKey] || "fold";
                  const label = getHandLabel(row, col);
                  
                  return (
                    <Tooltip key={`cell-${row}-${col}`}>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-6 h-6 flex items-center justify-center text-[9px] font-medium cursor-pointer transition-colors rounded-sm m-[1px] ${categoryColors[category]} ${category !== "fold" ? "text-white" : "text-muted-foreground"}`}
                          data-testid={`cell-${handKey}`}
                        >
                          {row === col ? rowRank : row < col ? "s" : "o"}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs">
                        <p className="font-semibold">{label}</p>
                        <p className="text-muted-foreground">{categoryLabels[category]}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {showLegend && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm ${categoryColors.raise}`} />
              <span className="text-xs text-muted-foreground">Raise ({stats.raise})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm ${categoryColors.call}`} />
              <span className="text-xs text-muted-foreground">Call ({stats.call})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-sm ${categoryColors.fold}`} />
              <span className="text-xs text-muted-foreground">Fold ({stats.fold})</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
