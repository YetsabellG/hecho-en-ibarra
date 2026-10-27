-- Keep new businesses on the free plan unless the administrator activates a paid plan.
ALTER TABLE public.businesses
  ALTER COLUMN plan SET DEFAULT 'gratis';

CREATE OR REPLACE FUNCTION public.enforce_business_plan_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Only the existing administrator account may change plan, expiry, premium, or verification fields.
  IF COALESCE(auth.jwt() ->> 'email', '') = 'guerrero.antonellaa11@gmail.com' THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.plan := 'gratis';
    NEW.premium := false;
    NEW.premium_until := NULL;
    NEW.verified := false;
  ELSE
    NEW.plan := OLD.plan;
    NEW.premium := OLD.premium;
    NEW.premium_until := OLD.premium_until;
    NEW.verified := OLD.verified;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.enforce_business_plan_fields() FROM PUBLIC;

DROP TRIGGER IF EXISTS enforce_business_plan_fields ON public.businesses;
CREATE TRIGGER enforce_business_plan_fields
  BEFORE INSERT OR UPDATE ON public.businesses
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_business_plan_fields();

-- Replace permissive owner policies that previously allowed every signed-in owner to write promotions.
DROP POLICY IF EXISTS "Authenticated users can insert promotions" ON public.promotions;
DROP POLICY IF EXISTS "Authenticated users can update promotions" ON public.promotions;
DROP POLICY IF EXISTS "Authenticated users can delete promotions" ON public.promotions;

CREATE POLICY "Paid business owners can insert promotions"
  ON public.promotions
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = uid
    AND EXISTS (
      SELECT 1
      FROM public.businesses AS business
      WHERE business.id = promotions.business_id
        AND business.uid = auth.uid()
        AND business.plan IN ('emprendedor', 'premium', 'empresa')
        AND (business.premium_until IS NULL OR business.premium_until > now())
    )
  );

CREATE POLICY "Paid business owners can update promotions"
  ON public.promotions
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = uid
    AND EXISTS (
      SELECT 1
      FROM public.businesses AS business
      WHERE business.id = promotions.business_id
        AND business.uid = auth.uid()
        AND business.plan IN ('emprendedor', 'premium', 'empresa')
        AND (business.premium_until IS NULL OR business.premium_until > now())
    )
  )
  WITH CHECK (
    auth.uid() = uid
    AND EXISTS (
      SELECT 1
      FROM public.businesses AS business
      WHERE business.id = promotions.business_id
        AND business.uid = auth.uid()
        AND business.plan IN ('emprendedor', 'premium', 'empresa')
        AND (business.premium_until IS NULL OR business.premium_until > now())
    )
  );

CREATE POLICY "Paid business owners can delete promotions"
  ON public.promotions
  FOR DELETE
  TO authenticated
  USING (
    auth.uid() = uid
    AND EXISTS (
      SELECT 1
      FROM public.businesses AS business
      WHERE business.id = promotions.business_id
        AND business.uid = auth.uid()
        AND business.plan IN ('emprendedor', 'premium', 'empresa')
        AND (business.premium_until IS NULL OR business.premium_until > now())
    )
  );

-- Expose only a total account count to the administrator; never expose auth.users rows or emails.
CREATE OR REPLACE FUNCTION public.get_admin_user_count()
RETURNS bigint
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  total_users bigint;
BEGIN
  IF (auth.jwt() ->> 'email') IS DISTINCT FROM 'guerrero.antonellaa11@gmail.com' THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE = '42501';
  END IF;

  SELECT count(*) INTO total_users FROM auth.users;
  RETURN total_users;
END;
$$;

REVOKE ALL ON FUNCTION public.get_admin_user_count() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_admin_user_count() FROM anon;
GRANT EXECUTE ON FUNCTION public.get_admin_user_count() TO authenticated;
