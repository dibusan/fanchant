class AnalyticSerializer < ActiveModel::Serializer
  attributes :id, :device_id, :url, :event, :device_type
end
