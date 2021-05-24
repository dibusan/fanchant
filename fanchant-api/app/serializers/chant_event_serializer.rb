class ChantEventSerializer < ActiveModel::Serializer
  attributes :id, :scheduled_for, :state

  has_one :chant
end
