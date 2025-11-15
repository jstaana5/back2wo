import { Leaf, Package, DollarSign, Award, TrendingDown } from 'lucide-react';

export function ProductAnalysis() {
  const suppliers = [
    {
      name: 'EcoTextile Co.',
      price: '$4.20',
      rating: 4.8,
      certified: 'OEKO-TEX',
      sustainability: 95,
      location: 'India'
    },
    {
      name: 'GreenThread',
      price: '$4.50',
      rating: 4.9,
      certified: 'GOTS',
      sustainability: 98,
      location: 'Turkey'
    },
    {
      name: 'SustainWeave',
      price: '$4.80',
      rating: 4.7,
      certified: 'Carbon Neutral',
      sustainability: 92,
      location: 'Portugal'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
      <div>
        <h3 className="mb-4">Product Analysis</h3>

        {/* Material Analysis */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
            <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">Material Composition</p>
              <p className="text-xs text-gray-600">100% Organic Cotton, 180 GSM</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
            <Package className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">Product Category</p>
              <p className="text-xs text-gray-600">Apparel - T-shirt / Basic Wear</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl">
            <TrendingDown className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">Carbon Footprint</p>
              <p className="text-xs text-gray-600">2.3kg CO2/unit (40% lower than average)</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl">
            <Award className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm">Quality Rating</p>
              <p className="text-xs text-gray-600">Premium Grade - Biodegradable</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers */}
      <div>
        <h4 className="mb-3">Sustainable Suppliers</h4>
        <div className="space-y-3">
          {suppliers.map((supplier, index) => (
            <div
              key={index}
              className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="flex items-center gap-2">
                    {supplier.name}
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {supplier.certified}
                    </span>
                  </p>
                  <p className="text-xs text-gray-600">{supplier.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-purple-600">{supplier.price}</p>
                  <p className="text-xs text-gray-600">per unit</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span>{supplier.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Leaf className="w-3 h-3 text-green-600" />
                  <span>{supplier.sustainability}% sustainable</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>Estimated cost savings: 15-20% vs traditional suppliers</span>
        </div>
      </div>
    </div>
  );
}
